using System;
using System.ComponentModel.DataAnnotations;

public class CreateEventDto
{
    [Required]
    public required int OrganizerId { get; set; }

    [Required]
    public required int VenueId { get; set; }

    [Required]
    [MaxLength(150)]
    public required string EventName { get; set; }

    [Required]
    public required string Description { get; set; }

    [Required]
    public required DateTime EventDate { get; set; }

    [Required]
    public required TimeSpan StartTime { get; set; }

    [Required]
    public required TimeSpan EndTime { get; set; }

    [Required]
    public required string ImageUrl { get; set; }
}
