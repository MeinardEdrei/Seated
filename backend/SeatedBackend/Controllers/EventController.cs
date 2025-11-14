using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeatedBackend.Services;
using SeatedBackend.DTOs;
using SeatedBackend.Models;
using SeatedBackend.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

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

        [Authorize]
        [HttpPost("upload-image")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadImage([FromForm] ImageUploadDto dto)
        {
            if (dto.ImageFile == null || dto.ImageFile.Length == 0)
                return BadRequest(new { message = "Image file is required" });

            if (string.IsNullOrEmpty(dto.EventName))
                return BadRequest(new { message = "Event name is required" });

            var imageUrl = await _cloudinaryService.UploadImageAsync(dto.ImageFile, dto.EventName);
            return Ok(new { imageUrl });
        }

        [Authorize(Roles = "organizer")]
        [HttpPost("create-event")]
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventDto dto)
        {
            if (string.IsNullOrEmpty(dto.EventName))
                return BadRequest(new { message = "Event name is required." });

            if (string.IsNullOrEmpty(dto.Description))
                return BadRequest(new { message = "Event description is required." });

            if (string.IsNullOrEmpty(dto.ImageUrl))
                return BadRequest(new { message = "Event imageUrl is required." });

            var organizerId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
                                   ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(organizerId))
                return Unauthorized(new { message = "Organizer identifier not found." });

            var newEvent = new Event
            {
                OrganizerId = int.Parse(organizerId),
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

            return Ok(new { message = "Event created successfully", data = newEvent });
        }

        [Authorize(Roles = "organizer")]
        [HttpPatch("update-event/{eventId}")]
        public async Task<IActionResult> UpdateEvent(int eventId, [FromBody] UpdateEventDto dto)
        {

            var existingEvent = await _context.Events.FindAsync(eventId);
            if (existingEvent == null)
                return NotFound(new { message = "Event not found." });

            var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value 
                       ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized(new { message = "User identifier not found." });

            var userId = int.Parse(userIdClaim);

            if (existingEvent.OrganizerId != userId)
                return StatusCode(403, new { message = "You are not authorized to update this event." });

            if (dto.VenueId.HasValue)
                existingEvent.VenueId = dto.VenueId.Value;
            if (!string.IsNullOrEmpty(dto.EventName))
                existingEvent.EventName = dto.EventName;
            if (!string.IsNullOrEmpty(dto.Description))
                existingEvent.Description = dto.Description;
            if (dto.EventDate.HasValue)
                existingEvent.EventDate = dto.EventDate.Value;
            if (dto.StartTime.HasValue)
                existingEvent.StartTime = dto.StartTime.Value;
            if (dto.EndTime.HasValue)
                existingEvent.EndTime = dto.EndTime.Value;
            if (!string.IsNullOrEmpty(dto.ImageUrl))
                existingEvent.ImageUrl = dto.ImageUrl;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Event updated successfully.", data = existingEvent });

        }

        [Authorize(Roles = "organizer")]
        [HttpDelete("delete-event/{eventId}")]
        public async Task<IActionResult> DeleteEvent(int eventId)
        {
            var existingEvent = await _context.Events.FindAsync(eventId);
            if (existingEvent == null)
                return NotFound(new { message = "Event not found." });

            var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value 
                       ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized(new { message = "User identifier not found." });
            var userId = int.Parse(userIdClaim);
            if (existingEvent.OrganizerId != userId)
                return StatusCode(403, new { message = "You are not authorized to delete this event." });

            _context.Events.Remove(existingEvent);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Event deleted successfully." });
        }


        [Authorize(Roles = "staff,loffice_head")]
        [HttpGet("get-all-events")]
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _context.Events.ToListAsync();
            return Ok(new { data = events });
        }

        [Authorize]
        [HttpGet("get-event/{eventId}")]
        public async Task<IActionResult> GetEventById(int eventId)
        {
            var existingEvent = await _context.Events.FindAsync(eventId);
            if (existingEvent == null)
                return NotFound(new { message = "Event not found." });
            return Ok(new { message = "Success!", data = existingEvent });
        }


        [Authorize(Roles = "organizer")]
        [HttpGet("get-events-by-organizer")]
        public async Task<IActionResult> GetEventsByOrganizer()
        {
            var nameIdentifiedClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value 
                       ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (nameIdentifiedClaim == null)
            {
                return Unauthorized(new { message = "User identifier not found." });
            }

            var userId = int.Parse(nameIdentifiedClaim);

            var events = await _context.Events.Where(e => e.OrganizerId == userId).ToListAsync();
            return Ok(new { data = events });
        }

        // Add Archive Event Endpoint


    }
}
