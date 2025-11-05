using System;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeatedBackend.Models
{
    public enum EventStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,

        [EnumMember(Value = "Approved")]
        Approved,

        [EnumMember(Value = "Rejected")]
        Rejected,

        [EnumMember(Value = "Archived")]
        Archived,
    }

    [Table("events")]
    public class Event
    {
        [Key]
        [Column("event_id")]
        public int EventId { get; set; }

        [ForeignKey("User")]
        [Column("organizer_id")]
        public int OrganizerId { get; set; }
        public User User { get; set; }

        [ForeignKey("Venue")]
        [Column("venue_id")]
        public int VenueId { get; set; }
        public Venue Venue { get; set; }

        [Required]
        [Column("event_name")]
        [MaxLength(150)]
        public string EventName { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("event_date")]
        public DateTime EventDate { get; set; }

        [Column("start_time")]
        public TimeSpan StartTime { get; set; }

        [Column("end_time")]
        public TimeSpan EndTime { get; set; }

        [Column("image_url")]
        public string ImageUrl { get; set; }

        [Column("qr_code")]
        public string QrCode { get; set; }

        [Column("status")]
        public EventStatus Status { get; set; } = EventStatus.Pending;

        [Column("approval_date")]
        public DateTime? ApprovalDate { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Relationships
        public ICollection<Reservation> Reservations { get; set; }
        public ICollection<SeatRequest> SeatRequests { get; set; }
    }
}
