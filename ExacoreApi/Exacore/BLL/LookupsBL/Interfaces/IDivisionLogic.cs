using Exacore.Dtos.Lookups;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface IDivisionLogic
    {
        Task<DivisionDto> Get(int Id);
        Task<List<DivisionDto>> GetAll();
        Task<DivisionDto> Add(DivisionDto dto);
        Task<DivisionDto> Update(DivisionDto dto);
        Task Delete(int Id);
        
        //add here

    }
}
