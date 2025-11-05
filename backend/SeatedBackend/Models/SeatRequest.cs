using System;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeatedBackend.Models
{
    public enum SeatRequestStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,

        [EnumMember(Value = "Approved")]
        Approved,

        [EnumMember(Value = "Rejected")]
        Rejected,
    }

    [Table("seat_requests")]
    public class SeatRequest
    {
        [Key]
        [Column("request_id")]
        public int RequestId { get; set; }

        [ForeignKey("User")]
        [Column("user_id")]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Event")]
        [Column("event_id")]
        public int EventId { get; set; }
        public Event Event { get; set; }

        [ForeignKey("Seat")]
        [Column("seat_id")]
        public int SeatId { get; set; }
        public Seat Seat { get; set; }

        [Column("status")]
        public SeatRequestStatus Status { get; set; } = SeatRequestStatus.Pending;

        [Column("requested_at")]
        public DateTime RequestedAt { get; set; } = DateTime.UtcNow;
    }
}
