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

public class UpdateEventDto {
    public int? OrganizerId { get; set; }
    public int? VenueId { get; set; }
    public string? EventName { get; set; }
    public string? Description { get; set; }
    public DateTime? EventDate { get; set; }
    public TimeSpan? StartTime { get; set; }
    public TimeSpan? EndTime { get; set; }
    public string? ImageUrl { get; set; }
}
