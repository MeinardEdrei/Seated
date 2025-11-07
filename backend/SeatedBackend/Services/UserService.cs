using SeatedBackend.Models;
using SeatedBackend.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace SeatedBackend.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> CreateGoogleUserAsync(string email, string googleId, UserRole role)
        {
            var user = new User
            {
                Email = email,
                GoogleId = googleId,
                Role = role,
                IsVerified = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> CreateEmailUserAsync(string email, string otpCode)
        {
            var user = new User
            {
                Email = email,
                Role = UserRole.Guest,
                IsVerified = false,
                OtpCode = otpCode,
                OtpExpiresAt = DateTime.UtcNow.AddMinutes(5),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        
        public  UserRole DetectUserRole(string email)
        {
            var parts = email.Split('@');
            if (parts.Length != 2)
                return UserRole.Guest; 

            var localPart = parts[0];
            var domain = parts[1].ToLower();

            // Check if not umak.edu.ph domain  Guest
            if (!Regex.IsMatch(domain, @"^umak\.edu\.ph$", RegexOptions.IgnoreCase))
                return UserRole.Guest;

            // Student: contains digits after a dot
            if (Regex.IsMatch(localPart, @"\.\w*\d"))
                return UserRole.Student;

            // Faculty: has dot but no digits
            if (localPart.Contains('.') && !Regex.IsMatch(localPart, @"\d"))
                return UserRole.Faculty;

            return UserRole.Guest;
        }
    }
}
