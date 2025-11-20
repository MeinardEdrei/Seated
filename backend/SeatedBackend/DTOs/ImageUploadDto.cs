namespace SeatedBackend.DTOs
{
    public class ImageUploadDto
    {
        public IFormFile ImageFile { get; set; } = null!;
        public string EventName { get; set; } = string.Empty;
    }

    public class ImageDeleteDto
    {
        public string PublicId { get; set; } = string.Empty;
    }
}
