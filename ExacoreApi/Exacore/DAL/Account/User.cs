using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Exacore.DAL.Entities.Account
{
    [Table("User")]
    public class User : IAuditable
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        [Required, MaxLength(50)]
        //[Index(IsUnique = true)]
        public string Email { get; set; }
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }

        public int ContactId { get; set; }
        [ForeignKey("ContactId")]
        public Contact Contact { get; set; }

        [JsonIgnore, Required, MaxLength(100)]
        public string Password { get; set; }
        public bool IsActive { get; set; } = false;

        public DateTime ChangedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
