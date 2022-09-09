namespace Exacore.Models
{
    public class AppSettings
    {
        public string JwtSecret { get; set; }
        public string Issuer { get; set; }
        public string Salt { get; set; }
        public string VideoFolder { get; set; }
        public EmailSettings EmailTemplate { get; set; }
    }
}
