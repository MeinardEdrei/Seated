using System;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeatedBackend.Models
{
    public enum SeatStatus
    {
        [EnumMember(Value = "available")]
        Available,

        [EnumMember(Value = "reserved")]
        Reserved,

        [EnumMember(Value = "disabled")]
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
        public required int VenueId { get; set; }
        public Venue? Venue { get; set; }

        [Column("seat_row")]
        public string? SeatRow { get; set; }

        [Column("seat_column")]
        public int? SeatColumn { get; set; }

        [Required]
        [Column("floor_type")]
        [MaxLength(50)]
        public required string FloorType { get; set; }

        [Required]
        [Column("seat_code")]
        [MaxLength(50)]
        public required string SeatCode { get; set; }

        [Column("is_special")]
        public bool IsSpecial { get; set; } = false;

        [Required]
        [Column("status")]
        public required SeatStatus Status { get; set; } = SeatStatus.Available;

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
