using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Primitives;
using System.Threading.Tasks;
using FirebaseAdmin.Auth;
using System.Linq;
using System;

namespace SeatedBackend.Middleware
{
  public class FirebaseAuthMiddleware
  {
    private readonly RequestDelegate _next;

    public FirebaseAuthMiddleware(RequestDelegate next)
    {
      _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      // Skip if endpoint allow anonymous (meaning it is a public endpoint)
      var endpoint = context.GetEndpoint();
      if (endpoint?.Metadata?.GetMetadata<Microsoft.AspNetCore.Authorization.AllowAnonymousAttribute>() != null)
      {
        await _next(context);
        return;
      }

      // cehcking of authorization header

      if (!context.Request.Headers.TryGetValue("Authorization", out StringValues authHeader)) 
      {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsync("Authorization header missing");
        return;
      }

      var token = authHeader.ToString().Replace("Bearer ", "");
      if (string.IsNullOrEmpty(token))
      {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsync("Token missing");
        return;
      }

      try 
      {
        var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
        context.Items["User"] = new
        {
          Uid = decodedToken.Uid,
          Email = decodedToken.Claims.ContainsKey("email") ? decodedToken.Claims["email"].ToString() : null
        };
        await _next(context);

      }
      catch (FirebaseAuthException ex)
      {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsync($"Invalid token: {ex.Message}");
      }
    }
  }
}
