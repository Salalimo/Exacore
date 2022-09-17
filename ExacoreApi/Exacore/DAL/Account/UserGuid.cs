using Exacore.Common;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exacore.DAL.Entities.Account
{
    [Table("UserGuid")]
    public class UserGuid 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserGuidId { get; set; }
        
        public int UserId { get; set; }
        [ForeignKey("UserId ")]
        public User User { get; set; }
        public UserGuids UserGuidType { get; set; }
        public string Guid { get; set; }
        public DateTime Expires{ get; set; }
        public DateTime ChangedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
