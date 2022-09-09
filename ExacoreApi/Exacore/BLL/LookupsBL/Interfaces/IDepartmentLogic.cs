using Exacore.Dtos.Lookups;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface IDepartmentLogic
    {
        Task<DepartmentDto> Get(int Id);
        Task<List<DepartmentDto>> GetAll();
        Task<DepartmentDto> Add(DepartmentDto dto);
        Task<DepartmentDto> Update(DepartmentDto dto);
        Task Delete(int Id);
        
        //add here

    }
}
