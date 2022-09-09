using Exacore.Dtos.Account;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.AuthBL.Interfaces
{
    public interface IUserLogic
    {
        Task<UserDto> Get(int Id);
        Task<List<UserDto>> GetAll();
        Task<UserDto> Add(UserDto dto);
        Task<UserDto> Update(UserDto dto);
        Task<UserDto> UpdatePassword(PasswordDto dto);
        Task Delete(int Id);

    }
}
