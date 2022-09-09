using Exacore.Dtos.Lookups;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface IControlMethodLogic
    {
        Task<ControlMethodDto> Get(int Id);
        Task<List<ControlMethodDto>> GetAll();
        Task<ControlMethodDto> Add(ControlMethodDto dto);
        Task<ControlMethodDto> Update(ControlMethodDto dto);
        Task Delete(int Id);
        
        //add here

    }
}
