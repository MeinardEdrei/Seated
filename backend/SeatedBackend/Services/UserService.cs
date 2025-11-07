using SeatedBackend.Models;
using SeatedBackend.Data;
using Microsoft.EntityFrameworkCore;

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
    }
}