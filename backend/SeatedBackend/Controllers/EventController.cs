using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeatedBackend.Services;
using SeatedBackend.DTOs;
using SeatedBackend.Models;
using SeatedBackend.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
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


        // [ApiExplorerSettings(IgnoreApi = true)]
        [Authorize(Roles = "Organizer")]
        [HttpPost("create-event")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateEvent([FromForm] CreateEventDto dto)
        {
            if (dto.ImageFile == null || dto.ImageFile.Length == 0)
                return BadRequest(new { message = "Event image is required" });

            if (string.IsNullOrEmpty(dto.EventName))
                return BadRequest(new { message = "Event name is required." });

            if (string.IsNullOrEmpty(dto.Description))
                return BadRequest(new { message = "Event description is required." });


            var organizerId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
                                   ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(organizerId))
                return Unauthorized(new { message = "Organizer identifier not found." });

            var uploadResult = await _cloudinaryService.UploadImageAsync(dto.ImageFile, dto.EventName);
            var ImageUrl = uploadResult.SecureUrl.AbsoluteUri;

            var newEvent = new Event
            {
                OrganizerId = int.Parse(organizerId),
                VenueId = dto.VenueId,
                EventName = dto.EventName,
                Description = dto.Description,
                EventDate = dto.EventDate,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                ImageUrl = ImageUrl,
                Status = EventStatus.Pending,
            };
            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Event created successfully", data = newEvent });
        }

        [Authorize(Roles = "Organizer")]
        [HttpPatch("update-event/{eventId}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateEvent(int eventId, [FromForm] UpdateEventDto dto)
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

            if (dto.ImageFile != null && dto.ImageFile.Length > 0)
            {
                if (!string.IsNullOrEmpty(existingEvent.ImageUrl))
                {
                    var oldPublicId = CloudinaryService.GetPublicId(existingEvent.ImageUrl);
                    if (!string.IsNullOrEmpty(oldPublicId))
                        await _cloudinaryService.DeleteImageAsync(oldPublicId);
                }

                var uploadResult = await _cloudinaryService.UploadImageAsync(dto.ImageFile, existingEvent.EventName);
                existingEvent.ImageUrl = uploadResult.SecureUrl.AbsoluteUri;
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Event updated successfully.", data = existingEvent });

        }

        [Authorize(Roles = "Organizer")]
        [HttpDelete("delete-event/{eventId}")]
        public async Task<IActionResult> DeleteEvent(int eventId)
        {
            var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
                           ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
                return Unauthorized(new { message = "User identifier not found." });

            var existingEvent = await _context.Events.FindAsync(eventId);
            if (existingEvent == null)
                return NotFound(new { message = "Event not found." });

            var userId = int.Parse(userIdClaim);

            if (existingEvent.OrganizerId != userId)
                return StatusCode(403, new { message = "You are not authorized to delete this event." });

            var imageUrl = existingEvent.ImageUrl;
            var publicId = CloudinaryService.GetPublicId(imageUrl);

            if (!string.IsNullOrEmpty(publicId))
            {
                var (deletionSuccess, errorMessage) = await _cloudinaryService.DeleteImageAsync(publicId);
                if (!deletionSuccess)
                {
                    return StatusCode(500, new
                    {
                        message = "Failed to delete event image from Cloudinary.",
                        error = errorMessage
                    });
                }
            }

            _context.Events.Remove(existingEvent);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Event deleted successfully." });
        }


        [Authorize(Roles = "Staff,Office_head")]
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


        [Authorize(Roles = "Organizer")]
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
