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

        public UserController(ApplicationDbContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

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

            // var user = new User
            // {
            //     Email = dto.Email,
            //     Role = UserRole.Guest,
            //     IsVerified = false,
            //     OtpCode = otp,
            //     OtpExpiresAt = System.DateTime.UtcNow.AddMinutes(5)
            // };
            // _context.Users.Add(user);
            // await _context.SaveChangesAsync();

            Console.WriteLine($"OTP for {dto.Email}: {otp}");
            Console.WriteLine($"User Role for {dto.Email}: " + DetectUserRole(dto.Email));

            await _emailService.SendEmailAsync(dto.Email, otp);

            return Ok(new { message = "OTP sent to email" });
        }

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

