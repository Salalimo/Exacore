using System;

namespace Exacore.Dtos.Account
{
    public class RefreshTokenDto
    {
        public string RefreshTokenId { get; set; }
        public string Subject { get; set; }
        public string ClientId { get; set; }
        public DateTime IssuedUtc { get; set; }
        public DateTime ExpiresUtc { get; set; }
        public string ProtectedTicket { get; set; }
    }
}
