using System;
using System.ComponentModel.DataAnnotations;
using SeatedBackend.Models;

namespace SeatedBackend.DTOs
{
    public class SendOtpDto
    {
        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; } = string.Empty;
    }

    public class VerifyOtpDto
    {
        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required, MaxLength(6)]
        public string OtpCode { get; set; } = string.Empty;
    }

    public class UserResponseDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public UserRole Role { get; set; }
        public bool IsVerified { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class UpdateUserDto
    {
        [MaxLength(100)]
        public string? Name { get; set; }
        public string? Email { get; set; }
        public UserRole? Role { get; set; }
    }
}
