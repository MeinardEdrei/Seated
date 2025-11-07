using System.Diagnostics;
using System.Text;

namespace SeatedBackend.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;

        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();
            
            // Log request details
            var requestInfo = new StringBuilder();
            requestInfo.AppendLine($"[REQUEST] {context.Request.Method} {context.Request.Path}{context.Request.QueryString}");
            requestInfo.AppendLine($"  Client IP: {context.Connection.RemoteIpAddress}");
            requestInfo.AppendLine($"  User-Agent: {context.Request.Headers["User-Agent"]}");
            
            // Log authentication status
            if (context.Request.Headers.ContainsKey("Authorization"))
            {
                var authHeader = context.Request.Headers["Authorization"].ToString();
                var tokenType = authHeader.StartsWith("Bearer ") ? "Bearer Token" : "Unknown";
                requestInfo.AppendLine($"  Auth: {tokenType} (present)");
            }
            else
            {
                requestInfo.AppendLine($"  Auth: None");
            }

            _logger.LogInformation(requestInfo.ToString());

            // original response 
            var originalBodyStream = context.Response.Body;

            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"[ERROR] Request {context.Request.Method} {context.Request.Path} failed");
                throw;
            }
            finally
            {
                stopwatch.Stop();
                var processingTime = stopwatch.ElapsedMilliseconds;
                
                // Log response details
                var statusCode = context.Response.StatusCode;
                var logLevel = statusCode >= 500 ? LogLevel.Error 
                             : statusCode >= 400 ? LogLevel.Warning 
                             : LogLevel.Information;

                _logger.Log(logLevel, 
                    $"[RESPONSE] {context.Request.Method} {context.Request.Path} " +
                    $"| Status: {statusCode} | Time: {processingTime}ms");
            }
        }
    }
}

