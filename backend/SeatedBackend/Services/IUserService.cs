using SeatedBackend.Models;

namespace SeatedBackend.Services
{
    public interface IUserService
    {
        Task<User> CreateGoogleUserAsync(string email, string googleId, UserRole role);
        Task<User> CreateEmailUserAsync(string email, string otpCode);
        UserRole DetectUserRole(string email);
    }
}
