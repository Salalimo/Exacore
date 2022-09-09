using Exacore.Dtos.Account;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.AuthBL.Interfaces
{
    public interface IUserGuidLogic
    {
        Task<UserGuidDto> Get(int Id);
        Task<List<UserGuidDto>> GetAll();
        Task<UserGuidDto> Add(UserGuidDto dto);
        Task<UserGuidDto> Update(UserGuidDto dto);
        Task Delete(int Id);
        
        //add here

    }
}
