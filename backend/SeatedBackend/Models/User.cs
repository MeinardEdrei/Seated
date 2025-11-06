using System;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeatedBackend.Models
{
    public enum UserRole
    {
        [EnumMember(Value = "guest")]
        Guest,

        [EnumMember(Value = "student")]
        Student,

        [EnumMember(Value = "faculty")]
        Faculty,

        [EnumMember(Value = "organizer")]
        Organizer,

        [EnumMember(Value = "staff")]
        Staff,

        [EnumMember(Value = "office_head")]
        OfficeHead
    }

    [Table("users")]
    public class User
    {
        [Key]
        [Column("user_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [MaxLength(255)]
        [Column("google_id")]
        public string? GoogleId { get; set; }

        [Required]
        [Column("role")]
        public UserRole Role { get; set; } = UserRole.Guest;

        [Required]
        [Column("is_verified")]
        public bool IsVerified { get; set; } = false;

        [MaxLength(6)]
        [Column("otp_code")]
        public string? OtpCode { get; set; }

        [Column("otp_expires_at")]
        public DateTime? OtpExpiresAt { get; set; }

        [MaxLength(255)]
        [Column("refresh_token")]
        public string? RefreshToken { get; set; }

        [Column("refresh_token_exp_at")]
        public DateTime? RefreshTokenExpAt { get; set; }

        [Required]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Event> Events { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
        public ICollection<SeatRequest> SeatRequests { get; set; }
    }
}
