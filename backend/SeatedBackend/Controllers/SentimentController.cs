using Microsoft.AspNetCore.Mvc;
using SeatedBackend.Models.HuggingFace;
using SeatedBackend.Services;
using Microsoft.AspNetCore.Authorization;

namespace SeatedBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SentimentController : ControllerBase
    {
        private readonly IHuggingFaceService _huggingFaceService;
        private readonly ILogger<SentimentController> _logger;

        public SentimentController(
            IHuggingFaceService huggingFaceService,
            ILogger<SentimentController> logger)
        {
            _huggingFaceService = huggingFaceService;
            _logger = logger;
        }
        
        // [Authorize]
        [HttpPost("analyze")]
        [ProducesResponseType(typeof(SentimentAnalysisResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status504GatewayTimeout)]
        public async Task<IActionResult> AnalyzeSentiment(
            [FromBody] SentimentAnalysisRequest request,
            CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.Text))
            {
                return BadRequest(new { error = "Text is required and cannot be empty" });
            }

            try
            {
                var result = await _huggingFaceService.AnalyzeSentimentAsync(
                    request.Text, 
                    cancellationToken);

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Invalid input for sentiment analysis");
                return BadRequest(new { error = ex.Message });
            }
            catch (TimeoutException ex)
            {
                _logger.LogError(ex, "Timeout while analyzing sentiment");
                return StatusCode(
                    StatusCodes.Status504GatewayTimeout,
                    new { error = "The sentiment analysis service took too long to respond" });
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Error communicating with HuggingFace API");
                return StatusCode(
                    StatusCodes.Status502BadGateway,
                    new { error = "Error communicating with sentiment analysis service" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error analyzing sentiment");
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new { error = "An unexpected error occurred" });
            }
        }

        [HttpGet("health")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult HealthCheck()
        {
            return Ok(new 
            { 
                status = "healthy", 
                service = "sentiment-analysis",
                timestamp = DateTime.UtcNow 
            });
        }
    }
}
