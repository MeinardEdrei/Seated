using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeatedBackend.Services;
using SeatedBackend.DTOs;
using SeatedBackend.Models;
using SeatedBackend.Data;

namespace SeatedBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly CloudinaryService _cloudinaryService;

        public EventController(ApplicationDbContext context, CloudinaryService cloudinaryService)
        {
            _context = context;
            _cloudinaryService = cloudinaryService;
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile imageFile, [FromForm] string eventName)
        {
            if (imageFile == null || imageFile.Length == 0)
                return BadRequest(new { message = "Image file is required" });

            if (string.IsNullOrEmpty(eventName))
                return BadRequest(new { message = "Event name is required" });

            var imageUrl = await _cloudinaryService.UploadImageAsync(imageFile, eventName);
            return Ok(new { imageUrl });
        }

        [HttpPost("create-event")]
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventDto dto)
        {
            if (string.IsNullOrEmpty(dto.EventName))
                return BadRequest(new { message = "Event name is required." });

            if (string.IsNullOrEmpty(dto.Description))
                return BadRequest(new { message = "Event description is required." });

            if (string.IsNullOrEmpty(dto.ImageUrl))
                return BadRequest(new { message = "Event imageUrl is required." });

            var newEvent = new Event
            {
                OrganizerId = dto.OrganizerId,
                VenueId = dto.VenueId,
                EventName = dto.EventName,
                Description = dto.Description,
                EventDate = dto.EventDate,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                ImageUrl = dto.ImageUrl,
                Status = EventStatus.Pending,
            };
            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Event created successfully" });
        }

        // public async Task<IActionResult> ModifyEvent()
        // { }
        //
        // public async Task<IActionResult> DeleteEvent()
        // { }
        //
        // public async Task<IActionResult> ArchiveEvent()
        // { }
    }
}
