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

        [ForeignKey("Venue")]
        [Column("venue_id")]
        public int VenueId { get; set; }
        public Venue Venue { get; set; }

        [Column("seat_row")]
        public int? SeatRow { get; set; }

        [Column("seat_column")]
        public int? SeatColumn { get; set; }

        [Required]
        [Column("floor_type")]
        [MaxLength(50)]
        public string FloorType { get; set; }

        [Required]
        [Column("seat_code")]
        [MaxLength(50)]
        public string SeatCode { get; set; }

        [Column("is_special")]
        public bool IsSpecial { get; set; } = false;

        [Required]
        [Column("status")]
        public SeatStatus Status { get; set; } = SeatStatus.Available;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public ICollection<Reservation> Reservations { get; set; }
        public ICollection<SeatRequest> SeatRequests { get; set; }
    }
}
