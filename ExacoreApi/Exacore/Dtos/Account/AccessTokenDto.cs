using System;

namespace Exacore.Dtos.Account
{
    public class AccessTokenDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public string RefreshTokenId { get; set; }
        public DateTime Issued { get; set; }
        public DateTime Expires { get; set; }
    }
}
