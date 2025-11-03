using Microsoft.Extensions.Configuration;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;

namespace SeatedBackend.Services
{
    public class EmailService
    {
        private readonly string _apiKey;
        private readonly string _fromEmail;
        private readonly string _fromName;

        public EmailService(IConfiguration config)
        {
            _apiKey = config["BREVO_API_KEY"] ?? throw new ArgumentNullException("BREVO_API_KEY");
            _fromEmail = config["BREVO_FROM_EMAIL"] ?? throw new ArgumentNullException("BREVO_FROM_EMAIL");
            _fromName = config["BREVO_FROM_NAME"] ?? "University of Makati";
        }

        public async System.Threading.Tasks.Task SendEmailAsync(string toEmail, string otp)
        {
            if (string.IsNullOrWhiteSpace(toEmail))
                throw new ArgumentNullException(nameof(toEmail));

            // Load email template
            string htmlBody = await File.ReadAllTextAsync("Templates/otp-email.html");
            htmlBody = htmlBody.Replace("{{OTP}}", otp);

            // Configure Brevo client
            Configuration.Default.ApiKey.Add("api-key", _apiKey);
            var apiInstance = new TransactionalEmailsApi();

            // Prepare email
            var sendSmtpEmail = new SendSmtpEmail(
                sender: new SendSmtpEmailSender(name: _fromName, email: _fromEmail),
                to: new List<SendSmtpEmailTo> { new SendSmtpEmailTo(email: toEmail) },
                subject: "[Seated] OTP Code for Account Registration",
                htmlContent: htmlBody
            );

            try
            {
                // Send email
                await apiInstance.SendTransacEmailAsync(sendSmtpEmail);
                Console.WriteLine($"OTP email sent to {toEmail}");
            }
            catch (sib_api_v3_sdk.Client.ApiException ex)
            {
                throw new ApplicationException($"Failed to send email: {ex.Message}", ex);
            }
        }
    }
}
