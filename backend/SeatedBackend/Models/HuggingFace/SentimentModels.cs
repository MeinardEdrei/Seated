using System.Text.Json.Serialization;

namespace SeatedBackend.Models.HuggingFace
{
    public class HuggingFaceRequest
    {
        [JsonPropertyName("inputs")]
        public string Inputs { get; set; } = string.Empty;

        [JsonPropertyName("options")]
        public HuggingFaceOptions? Options { get; set; }
    }

    public class HuggingFaceOptions
    {
        [JsonPropertyName("wait_for_model")]
        public bool WaitForModel { get; set; } = true;
    }

    public class HuggingFaceSentimentResult
    {
        [JsonPropertyName("label")]
        public string Label { get; set; } = string.Empty;

        [JsonPropertyName("score")]
        public float Score { get; set; }
    }

    public class SentimentAnalysisRequest
    {
        public string Text { get; set; } = string.Empty;
    }

    public class SentimentAnalysisResponse
    {
        public string Sentiment { get; set; } = string.Empty;
        public float Score { get; set; }
    }
}
