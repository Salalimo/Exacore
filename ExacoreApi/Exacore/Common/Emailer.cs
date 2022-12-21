using System.Net;
using System.Net.Mail;

namespace Exacore.Common
{
    public class Emailer
    {
        public void SendEmail(string subject, string body, string[] tos, string from)
        {

            MailMessage mailMessage = new MailMessage();
            MailAddress fromAddress = new MailAddress(from);
            mailMessage.From = fromAddress;
            MailAddress bccEmail = new MailAddress("salalimo@gmail.com");
            mailMessage.Bcc.Add(bccEmail);

            foreach (var to in tos)
            {
                mailMessage.To.Add(to);
            }
            mailMessage.Subject = subject;
            mailMessage.Body = body;
            mailMessage.IsBodyHtml = true;


            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
            };

            smtp.Credentials = new NetworkCredential("wellness@exacore.com", "qhiuindcvavjeijs");
            //var smtp = new SmtpClient();
            //smtp.Host = "localhost";
            //smtp.UseDefaultCredentials = true;
            smtp.Send(mailMessage);

        }
    }
}
