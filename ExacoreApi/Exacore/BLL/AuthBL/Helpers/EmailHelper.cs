using Exacore.Common;
using Exacore.Models;
using System.IO;

namespace Exacore.AuhBL.AuthenticationBL.Helpers
{
    public class EmailHelper
    {
        public static string SendVerificationEmail(AppSettings appSettings, string email, string firstName, string lastName)
        {
            string subject = "Exacore - Activate Acount";
            string to = email;
            string path = Path.Combine(Directory.GetCurrentDirectory(), "Content\\Templates\\EmailUserVerification.htm");
            string body = File.ReadAllText(path);
            string guid = System.Guid.NewGuid().ToString();

            //string verificationLink = appSettings.EmailTemplate.HomePageLink + "/activateaccount?email=" + email + "&guid=" + guid;
            string verificationLink = appSettings.EmailTemplate.HomePageLink + "#/resetpassword?email=" + email + "&guid=" + guid;
            body = body.Replace(":link:", verificationLink);
            body = body.Replace(":name:", firstName + " " + lastName);
            body = body.Replace(":homepagelink:", appSettings.EmailTemplate.HomePageLink);
            body = body.Replace(":logo:", appSettings.EmailTemplate.Logo);
            body = body.Replace(":loginlink:", appSettings.EmailTemplate.LoginLink);
            body = body.Replace(":companyname:", appSettings.EmailTemplate.CompanyName);
            body = body.Replace(":supportemail:", appSettings.EmailTemplate.FromEmail);

            var emailer = new Emailer();
            //emailer.SendEmail(subject, body, new string[] { "salalimo@gmail.com" }, appSettings.FromEmail);
            emailer.SendEmail(subject, body, new string[] { email }, appSettings.EmailTemplate.FromEmail);
            return guid;
        }

        public static string SendForgotPasswordEmail(AppSettings appSettings, string email, string firstName, string lastName)
        {
            string subject = "Exacore - Password Reset";
            string path = Path.Combine(Directory.GetCurrentDirectory(), "Content\\Templates\\EmailPasswordReset.htm");
            string body = File.ReadAllText(path);
            string guid = System.Guid.NewGuid().ToString();
            string link = appSettings.EmailTemplate.HomePageLink + "#/resetpassword?email=" + email + "&guid=" + guid;
            body = body.Replace(":link:", link);
            body = body.Replace(":name:", firstName + " " + lastName);
            body = body.Replace(":homepagelink:", appSettings.EmailTemplate.HomePageLink);
            body = body.Replace(":logo:", appSettings.EmailTemplate.Logo);
            body = body.Replace(":loginlink:", appSettings.EmailTemplate.LoginLink);
            body = body.Replace(":companyname:", appSettings.EmailTemplate.CompanyName);
            body = body.Replace(":supportemail:", appSettings.EmailTemplate.FromEmail);

            var emailer = new Emailer();
            emailer.SendEmail(subject, body, new string[] { "salalimo@gmail.com" }, appSettings.EmailTemplate.FromEmail);
            return guid;
        }


    }
}
