using System;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeatedBackend.Models
{
    public enum SeatStatus
    {
        [EnumMember(Value = "Available")]
        Available,
        [EnumMember(Value = "Reserved")]
        Reserved,
        [EnumMember(Value = "Disabled")]
        Disabled,
    }

    [Table("seats")]
    public class Seat
    {
        [Key]
        [Column("seat_id")]
        public int SeatId { get; set; }

        [Required]
        [ForeignKey("Venue")]
        [Column("venue_id")]
        public int VenueId { get; set; }
        public Venue? Venue { get; set; }

        [Column("seat_row")]
        [MaxLength(10)]
        public string? SeatRow { get; set; }

        [Column("seat_column")]
        public int? SeatColumn { get; set; }

        [Required]
        [Column("section")]
        [MaxLength(100)]
        public string Section { get; set; } = string.Empty;

        [Required]
        [Column("floor_type")]
        [MaxLength(50)]
        public string FloorType { get; set; } = string.Empty;

        [Required]
        [Column("seat_code")]
        [MaxLength(50)]
        public string SeatCode { get; set; } = string.Empty;

        [Column("display_seat_code")]
        [MaxLength(50)]
        public string DisplaySeatCode { get; set; } = string.Empty;

        [Column("is_special")]
        public bool IsSpecial { get; set; } = false;

        [Required]
        [Column("status")]
        public SeatStatus Status { get; set; } = SeatStatus.Available;

        [Required]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
        public ICollection<SeatRequest> SeatRequests { get; set; } = new List<SeatRequest>();
    }
}
