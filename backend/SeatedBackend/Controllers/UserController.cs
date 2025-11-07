using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeatedBackend.Services;
using SeatedBackend.DTOs;
using SeatedBackend.Models;
using SeatedBackend.Data;

namespace SeatedBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly EmailService _emailService;
        private readonly ITokenService _tokenService;

        public UserController(ApplicationDbContext context, EmailService emailService,
                ITokenService tokenService)
        {
            _context = context;
            _emailService = emailService;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("send-otp")]
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

            var user = new User
            {
                Email = dto.Email,
                Role = UserRole.Guest,
                IsVerified = false,
                OtpCode = otp,
                OtpExpiresAt = System.DateTime.UtcNow.AddMinutes(5)
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            Console.WriteLine($"OTP for {dto.Email}: {otp}");
            Console.WriteLine($"User Role for {dto.Email}: " + DetectUserRole(dto.Email));

            await _emailService.SendEmailAsync(dto.Email, otp);

            return Ok(new { message = "OTP sent to email" });
        }

        [AllowAnonymous]
        [HttpPost("sign-up")]
        public async Task<IActionResult> Register([FromBody] VerifyOtpDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
                return NotFound(new { message = "User not found." });

            if (user.OtpCode != dto.OtpCode)
                return BadRequest(new { message = "Invalid OTP code." });

            if (user.OtpExpiresAt < DateTime.UtcNow)
                return BadRequest(new { message = "OTP expired." });

            var role = DetectUserRole(dto.Email);
            user.Role = role;

            user.IsVerified = true;
            user.OtpCode = null;
            user.OtpExpiresAt = null;
            user.UpdatedAt = System.DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Account created successfully!",
                role = role.ToString()
            });
        }

        [AllowAnonymous]
        [HttpPost("login")]
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

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
          var user = HttpContext.Items["User"] as dynamic;
          if (user == null)
            return Unauthorized();

          return Ok(new
          {
            id = user.Uid,
            email = user.Email
          });
        }


        [HttpPost("logout")]
        [Authorize]
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

            return Ok(new { message = "Logged out successfully." });
        }


        private static UserRole DetectUserRole(string email)
        {
            var localPart = email.Split('@')[0];

            // If contains digits after the dot = student
            if (Regex.IsMatch(localPart, @"\.\w*\d"))
                return UserRole.Student;

            // If contains a dot but no numbers = faculty
            if (localPart.Contains('.') && !Regex.IsMatch(localPart, @"\d"))
                return UserRole.Faculty;

            return UserRole.Guest;
        }
    }
}

