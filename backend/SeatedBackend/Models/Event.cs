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

        [Required]
        [ForeignKey("User")]
        [Column("organizer_id")]
        public required int OrganizerId { get; set; }
        public User? User { get; set; }

        [Required]
        [ForeignKey("Venue")]
        [Column("venue_id")]
        public required int VenueId { get; set; }
        public Venue? Venue { get; set; }

        [Required]
        [Column("event_name")]
        [MaxLength(150)]
        public required string EventName { get; set; }

        [Required]
        [Column("description")]
        public required string Description { get; set; }

        [Required]
        [Column("event_date")]
        public required DateTime EventDate { get; set; }

        [Required]
        [Column("start_time")]
        public required TimeSpan StartTime { get; set; }

        [Required]
        [Column("end_time")]
        public required TimeSpan EndTime { get; set; }

        [Required]
        [Column("image_url")]
        public required string ImageUrl { get; set; }

        [Column("qr_code")]
        public string? QrCode { get; set; }

        [Required]
        [Column("status")]
        public required EventStatus Status { get; set; } = EventStatus.Pending;

        [Column("approval_date")]
        public DateTime? ApprovalDate { get; set; }

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
