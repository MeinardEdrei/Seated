using System;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeatedBackend.Models
{
    [Table("venues")]
    public class Venue
    {
        [Key]
        [Column("venue_id")]
        public int VenueId { get; set; }

        [Required]
        [Column("venue_name")]
        [MaxLength(100)]
        public string VenueName { get; set; }

        [Column("capacity")]
        public int Capacity { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public ICollection<Event> Events { get; set; }
        public ICollection<Seat> Seats { get; set; }
    }
}
