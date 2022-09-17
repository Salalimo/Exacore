using Exacore.Dtos.Account;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.AuthBL.Interfaces
{
    public interface IRoleLogic
    {
        Task<List<RoleDto>> GetAll();

    }
}
