using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exacore.DAL.Entities.Account
{
    [Table("Role")]
    public partial class Role : BaseEntity, IAuditable
    {
        public Role()
        {
            //Users = new HashSet<User>();
        }

        public int RoleId { get; set; }
        public string Name { get; set; }

        //public virtual ICollection<User> Users { get; set; }
    }
}
