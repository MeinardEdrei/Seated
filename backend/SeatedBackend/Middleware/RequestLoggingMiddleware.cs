using System.Diagnostics;

namespace SeatedBackend.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();

            await _next(context);

            stopwatch.Stop();
            var processingTime = stopwatch.ElapsedMilliseconds;

            Console.WriteLine($"Request: {context.Request.Method} {context.Request.Path} processed in {processingTime} ms");
        }
    }

}

