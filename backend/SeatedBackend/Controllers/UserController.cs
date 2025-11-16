using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeatedBackend.Services;
using SeatedBackend.DTOs;
using SeatedBackend.Models;
using SeatedBackend.Data;
using FirebaseAdmin.Auth;
using Microsoft.Extensions.Caching.Distributed;

namespace SeatedBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly EmailService _emailService;
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;
        private readonly IDistributedCache _cache; 

        public UserController(ApplicationDbContext context, EmailService emailService,
                ITokenService tokenService, IUserService userService, IDistributedCache cache)
        {
            _context = context;
            _emailService = emailService;
            _tokenService = tokenService;
            _userService = userService;
            _cache = cache;

        }

        [AllowAnonymous]
        [HttpPost("send-signup-otp")]
        public async Task<IActionResult> SendOtp([FromBody] SendOtpDto dto)
        {
            // Restriction
            if (string.IsNullOrWhiteSpace(dto.Email))
                return BadRequest(new { message = "Email are required." });

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (existingUser != null)
                return BadRequest(new { message = "Account already exists" });

            // Otp
            var otp = new Random().Next(100000, 999999).ToString();

            await _cache.SetStringAsync($"OTP_{dto.Email}", otp, new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            });

            Console.WriteLine($"OTP for {dto.Email}: {otp}");
            Console.WriteLine($"User Role for {dto.Email}: " + _userService.DetectUserRole(dto.Email));

            await _emailService.SendEmailAsync(dto.Email, otp);

            return Ok(new {success = true, message = "OTP sent to email" });
        }

        [AllowAnonymous]
        [HttpPost("sign-up")]
        public async Task<IActionResult> Register([FromBody] VerifyOtpDto dto)
        {
            var cachedOtp = await _cache.GetStringAsync($"OTP_{dto.Email}");

            // Check if OTP exists first
            if (cachedOtp == null)
                return BadRequest(new { message = "OTP code expired or not found. Please request a new one." });

            // Then check if it matches
            if (cachedOtp != dto.OtpCode)
                return BadRequest(new { message = "Invalid OTP code." });

            var user = new User
            {
                Email = dto.Email,
                Role = _userService.DetectUserRole(dto.Email),
                IsVerified = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow

            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            await _cache.RemoveAsync($"OTP_{dto.Email}");
            return Ok(new
            {
                success = true,
                message = "Account created successfully!",
                role = user.Role.ToString()
            });
        }

        [AllowAnonymous]
        [HttpPost("email-login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email &&
                    u.IsVerified == true);
            if (user == null)
                return Unauthorized(new { message = "Invalid Email." });

            var accessToken = _tokenService.GenerateToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpAt = DateTime.UtcNow.AddDays(60);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                accessToken,
                refreshToken,
                user = new { id = user.UserId, email = user.Email, role = user.Role.ToString() }
            });
        }

        [AllowAnonymous]
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequestDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.RefreshToken))
                return BadRequest(new { message = "Refresh token required." });

            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == dto.RefreshToken);
            if (user == null)
                return Unauthorized(new { message = "Invalid refresh token." });

            if (!user.RefreshTokenExpAt.HasValue || user.RefreshTokenExpAt.Value < DateTime.UtcNow)
            {
                user.RefreshToken = null;
                user.RefreshTokenExpAt = null;
                await _context.SaveChangesAsync();
                return Unauthorized(new { message = "Refresh token expired. Please login again." });
            }

            // Generate new access token & reset refresh token
            var newAccessToken = _tokenService.GenerateToken(user);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpAt = DateTime.UtcNow.AddDays(60);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                accessToken = newAccessToken,
                refreshToken = newRefreshToken
            });
        }
        

        [HttpPost("google-login")]
        [AllowAnonymous] 
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.IdToken))
                return BadRequest(new { message = "IdToken is required." });

            Console.WriteLine($"[GoogleLogin] Received IdToken (first 50 chars): {dto.IdToken.Substring(0, Math.Min(50, dto.IdToken.Length))}...");

            try 
            {
                // Verify Firebase token
                Console.WriteLine("[GoogleLogin] Starting token verification...");
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(dto.IdToken);
                Console.WriteLine("[GoogleLogin] Token verified successfully");
                
                string email = decodedToken.Claims.ContainsKey("email") 
                    ? decodedToken.Claims["email"].ToString() ?? string.Empty 
                    : string.Empty;
                
                Console.WriteLine($"[GoogleLogin] Email from token: {email}");

                if (string.IsNullOrWhiteSpace(email))
                    return BadRequest(new { message = "Email not found in token." });

                // Find user by email 
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
                
                if (user == null)
                {
                    Console.WriteLine($"[GoogleLogin] Creating new user for: {email}");
                    // Create new user with Google
                    var role = _userService.DetectUserRole(email);
                    user = new User
                    {
                        Email = email,
                        GoogleId = decodedToken.Uid,
                        Role = role,
                        IsVerified = true,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    };
                    _context.Users.Add(user);
                }
                else
                {
                    Console.WriteLine($"[GoogleLogin] Existing user found: {email}");
                    
                    // If user exists but has no GoogleId, link it
                    if (string.IsNullOrWhiteSpace(user.GoogleId))
                    {
                        Console.WriteLine($"[GoogleLogin] Linking Google account to existing email user: {email}");
                        user.GoogleId = decodedToken.Uid;
                        user.IsVerified = true; 
                        user.UpdatedAt = DateTime.UtcNow;
                        // Send notification email here if needed.... to be implemented
                    }
                    else if (user.GoogleId != decodedToken.Uid)
                    {
                        // Google ID mismatch 
                        Console.WriteLine($"[GoogleLogin] WARNING: Google ID mismatch for {email}");
                        return BadRequest(new { message = "This email is associated with a different Google account." });
                    }
                }

                // Generate JWT tokens
                var accessToken = _tokenService.GenerateToken(user);
                var refreshToken = _tokenService.GenerateRefreshToken();

                user.RefreshToken = refreshToken;
                user.RefreshTokenExpAt = DateTime.UtcNow.AddDays(60);
                await _context.SaveChangesAsync();

                Console.WriteLine($"[GoogleLogin] Login successful for: {email}");

                return Ok(new 
                { 
                    message = "Login successful",
                    accessToken,
                    refreshToken,
                    user = new 
                    {
                        id = user.UserId,
                        email = user.Email,
                        role = user.Role.ToString()
                    }
                });
            }
            catch (FirebaseAuthException ex)
            {
                Console.WriteLine($"[GoogleLogin] Firebase auth error: {ex.Message}");
                Console.WriteLine($"[GoogleLogin] Error code: {ex.ErrorCode}");
                return Unauthorized(new { message = "Invalid Firebase token", error = ex.Message, errorCode = ex.ErrorCode });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GoogleLogin] Unexpected error: {ex.Message}");
                Console.WriteLine($"[GoogleLogin] Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
          
          
          
        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            // Get user ID from JWT claims
            var sub = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

            if (sub == null || !int.TryParse(sub, out var userId))
                return Unauthorized();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user == null)
                return NotFound(new { message = "User not found." });

            return Ok(new
            {
                id = user.UserId,
                email = user.Email,
                role = user.Role.ToString(),
                isVerified = user.IsVerified
            });
        }


        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // Find user ID in claims
            var sub = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
               ?? User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

            if (sub == null || !int.TryParse(sub, out var userId))
                return Unauthorized(new { message = "Invalid token." });

            // Find user in DB
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user != null)
            {
                user.RefreshToken = null;
                user.RefreshTokenExpAt = null;
                await _context.SaveChangesAsync();
            }

            return Ok(new {success = true, message = "Logged out successfully." });
        }

        [AllowAnonymous]
        [HttpPost("send-login-otp")]
        public async Task<IActionResult> SendLoginOtp([FromBody] SendOtpDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email))
                return BadRequest(new { message = "Email is required." });

            // Check if user EXISTS 
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (existingUser == null)
                return Unauthorized(new { message = "Email not registered" });

            // Generate OTP
            var otp = new Random().Next(100000, 999999).ToString();

            await _cache.SetStringAsync($"LOGIN_OTP_{dto.Email}", otp, new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            });

            Console.WriteLine($"Login OTP for {dto.Email}: {otp}");

            await _emailService.SendEmailAsync(dto.Email, otp);

            return Ok(new { success = true, message = "Login OTP sent to email" });
        }

        [AllowAnonymous]
        [HttpPost("verify-login-otp")]
        public async Task<IActionResult> VerifyLoginOtp([FromBody] VerifyOtpDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.OtpCode))
                return BadRequest(new { message = "Email and OTP are required." });

            // Verify OTP
            var cachedOtp = await _cache.GetStringAsync($"LOGIN_OTP_{dto.Email}");
            if (cachedOtp == null)
                return BadRequest(new { message = "OTP expired or not found." });

            if (cachedOtp != dto.OtpCode)
                return BadRequest(new { message = "Invalid OTP." });

            // Get existing user
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
                return Unauthorized(new { message = "User not found" });

            // Generate tokens
            var accessToken = _tokenService.GenerateToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpAt = DateTime.UtcNow.AddDays(60);
            await _context.SaveChangesAsync();

            // Delete OTP after successful login
            await _cache.RemoveAsync($"LOGIN_OTP_{dto.Email}");

            return Ok(new
            {
                accessToken,
                refreshToken,
                user = new
                {
                    id = user.UserId,
                    email = user.Email,
                    role = user.Role
                }
            });
        }
    }
}

