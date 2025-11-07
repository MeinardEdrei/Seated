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

    public async Task<string> UploadImageAsync(IFormFile file, string eventName)
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
        return uploadResult.SecureUrl.AbsoluteUri;
    }

    public static string Sanitize(string input)
    {
        if (string.IsNullOrEmpty(input)) return "default";
        return Regex.Replace(input, @"[^a-zA-Z0-9_\-]", "_");
    }
}
