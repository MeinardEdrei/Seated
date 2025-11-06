using System;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeatedBackend.Models
{
    public enum ReservationStatus
    {
        [EnumMember(Value = "Reserved")]
        Reserved,

        [EnumMember(Value = "Cancelled")]
        Cancelled,

        [EnumMember(Value = "Attended")]
        Attended,

        [EnumMember(Value = "Absent")]
        Absent,
    }

    [Table("reservations")]
    public class Reservation
    {
        [Key]
        [Column("reservation_id")]
        public int ReservationId { get; set; }

        [Required]
        [ForeignKey("User")]
        [Column("user_id")]
        public required int UserId { get; set; }
        public User? User { get; set; }

        [Required]
        [ForeignKey("Event")]
        [Column("event_id")]
        public required int EventId { get; set; }
        public Event? Event { get; set; }

        [Required]
        [ForeignKey("Seat")]
        [Column("seat_id")]
        public required int SeatId { get; set; }
        public Seat? Seat { get; set; }

        [Required]
        [Column("status")]
        public required ReservationStatus Status { get; set; } = ReservationStatus.Reserved;

        [Required]
        [Column("qr_code")]
        public required string QrCode { get; set; }

        [Required]
        [Column("reserved_at")]
        public DateTime ReservedAt { get; set; } = DateTime.UtcNow;

        [Column("checked_in_at")]
        public DateTime? CheckedInAt { get; set; }
    }
}
