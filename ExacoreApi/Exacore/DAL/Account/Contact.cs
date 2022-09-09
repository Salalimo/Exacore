using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exacore.DAL.Entities.Account
{
    [Table("Contact")]
    public class Contact : BaseEntity, IAuditable
    {
        [Column("ContactID")]
        public int ContactId { get; set; }
        [Column("FirstName")]
        public string FirstName { get; set; }
        [Column("LastName")]
        public string LastName { get; set; }
        [Column("Phone")]
        [StringLength(50)]
        public string Phone { get; set; }
    }
}
