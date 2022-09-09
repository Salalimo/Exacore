using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exacore.DAL.Entities.Account
{
    [Table("RefreshToken")]
    public class RefreshToken
    {
        [Key]
        public string RefreshTokenId { get; set; }
        [Required]
        [MaxLength(50)]
        public string UserName { get; set; }
        public DateTime IssuedUtc { get; set; }
        public DateTime ExpiresUtc { get; set; }
        [Required]
        public string ProtectedTicket { get; set; }
    }
}
