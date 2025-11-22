using System;
using System.ComponentModel.DataAnnotations;

public class CreateEventDto
{
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
    public required IFormFile ImageFile { get; set; }
}

public class UpdateEventDto {
    public int? VenueId { get; set; }
    public string? EventName { get; set; }
    public string? Description { get; set; }
    public DateTime? EventDate { get; set; }
    public TimeSpan? StartTime { get; set; }
    public TimeSpan? EndTime { get; set; }
    public IFormFile? ImageFile { get; set; }
}

public class EventDto
{
    public int EventId { get; set; }
    public int OrganizerId { get; set; }
    public int VenueId { get; set; }
    public string EventName { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime EventDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public string ImageUrl { get; set; } = null!;
    public string Status { get; set; } = "Pending";
    public string? QrCode { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? ApprovalDate { get; set; }
}


