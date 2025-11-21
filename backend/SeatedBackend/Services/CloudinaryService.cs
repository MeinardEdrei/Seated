using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System.Text.RegularExpressions;

public class CloudinaryService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryService(IConfiguration config)
    {
        var cloudName = config["CLOUDINARY_CLOUD_NAME"];
        var apiKey = config["CLOUDINARY_API_KEY"];
        var apiSecret = config["CLOUDINARY_API_SECRET"];

        var account = new Account(cloudName, apiKey, apiSecret);
        _cloudinary = new Cloudinary(account);
    }

    public async Task<ImageUploadResult> UploadImageAsync(IFormFile file, string eventName)
    {
        if (file == null || file.Length == 0)
            throw new Exception("File is empty");

        var sanitizedEventName = Sanitize(eventName);
        var folderPath = $"Seated/EventImages/{sanitizedEventName}";
        var fileName = $"{sanitizedEventName}_{file.FileName}";

        using var stream = file.OpenReadStream();

        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(fileName, stream),
            Folder = folderPath
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        return uploadResult;
    }

    public async Task<(bool Success, string? ErrorMessage)> DeleteImageAsync(string publicId)
    {
        if (string.IsNullOrEmpty(publicId))
            throw new ArgumentException("Public ID cannot be null or empty.", nameof(publicId));

        var deleteParams = new DeletionParams(publicId)
        {
            ResourceType = ResourceType.Image
        };

        try
        {
            var result = await _cloudinary.DestroyAsync(deleteParams);
            if (result.Result == "ok")
                return (true, null);

            return (false, result.Error?.Message ?? "Unknown error from Cloudinary");
        }
        catch (Exception ex)
        {
            return (false, ex.Message);
        }
    }


    public static string GetPublicId(string Url)
    {
        if (string.IsNullOrEmpty(Url))
            return string.Empty;

        string pattern = @"Seated.*(?=\.)";

        Match match = Regex.Match(Url, pattern);
        if (match.Success)
        {
            return match.Value;
        }
        return string.Empty;
    }

    public static string Sanitize(string input)
    {
        if (string.IsNullOrEmpty(input)) return "default";
        return Regex.Replace(input, @"[^a-zA-Z0-9_\-]", "_");
    }
}
