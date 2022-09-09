using System.Collections.Generic;

namespace Exacore.Dtos.Account
{
    public class RoleDto : BaseDto
    {
        public int RoleId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<UserDto> Users { get; set; }
    }
}
