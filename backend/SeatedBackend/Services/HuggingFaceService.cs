using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;
using SeatedBackend.Settings;
using SeatedBackend.Models.HuggingFace;

namespace SeatedBackend.Services
{
    public interface IHuggingFaceService
    {
        Task<SentimentAnalysisResponse> AnalyzeSentimentAsync(string text, CancellationToken cancellationToken = default);
    }

    public class HuggingFaceService : IHuggingFaceService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<HuggingFaceService> _logger;
        private readonly HuggingFaceSettings _settings;

        public HuggingFaceService(
            HttpClient httpClient,
            IOptions<HuggingFaceSettings> settings,
            ILogger<HuggingFaceService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _settings = settings.Value;

            if (string.IsNullOrEmpty(_settings.ApiToken))
            {
                throw new InvalidOperationException("HuggingFace API Token is not configured");
            }

            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _settings.ApiToken);
            _httpClient.Timeout = TimeSpan.FromSeconds(30);
        }

        public async Task<SentimentAnalysisResponse> AnalyzeSentimentAsync(
            string text,
            CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                throw new ArgumentException("Text cannot be empty", nameof(text));
            }

            try
            {
                var request = new HuggingFaceRequest
                {
                    Inputs = text,
                    Options = new HuggingFaceOptions { WaitForModel = true }
                };

                var jsonContent = JsonSerializer.Serialize(request, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });

                var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                _logger.LogInformation(
                    "Sending sentiment analysis request to HuggingFace. Text length: {Length}",
                    text.Length);

                var response = await _httpClient.PostAsync(
                    _settings.ModelUrl,
                    httpContent,
                    cancellationToken);

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync(cancellationToken);
                    _logger.LogError(
                        "HuggingFace API error: {StatusCode} - {Error}",
                        response.StatusCode,
                        errorContent);

                    throw new HttpRequestException(
                        $"HuggingFace API returned {response.StatusCode}: {errorContent}");
                }

                var responseContent = await response.Content.ReadAsStringAsync(cancellationToken);

                // HuggingFace returns: [[{label, score}, {label, score}, ...]]
                var results = JsonSerializer.Deserialize<List<List<HuggingFaceSentimentResult>>>(
                    responseContent,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (results == null || results.Count == 0 || results[0].Count == 0)
                {
                    throw new InvalidOperationException("Invalid response from HuggingFace API");
                }

                // Get the sentiment with the highest score
                var bestSentiment = results[0]
                    .OrderByDescending(r => r.Score)
                    .First();

                _logger.LogInformation(
                    "Sentiment analysis completed: {Sentiment} ({Score:F4})",
                    bestSentiment.Label,
                    bestSentiment.Score);

                return new SentimentAnalysisResponse
                {
                    Sentiment = bestSentiment.Label,
                    Score = (float)Math.Round(bestSentiment.Score, 4)
                };
            }
            catch (TaskCanceledException)
            {
                _logger.LogError("HuggingFace API request timed out");
                throw new TimeoutException("HuggingFace API did not respond in time");
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Error communicating with HuggingFace API");
                throw;
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Error parsing HuggingFace API response");
                throw new InvalidOperationException("Failed to parse HuggingFace API response", ex);
            }
        }
    }
}
