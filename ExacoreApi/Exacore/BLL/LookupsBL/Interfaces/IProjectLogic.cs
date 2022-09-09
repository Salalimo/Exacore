using Exacore.Dtos.Lookups;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface IProjectLogic
    {
        Task<ProjectDto> Get(int Id);
        Task<List<ProjectDto>> GetAll();
        Task<ProjectDto> Add(ProjectDto dto);
        Task<ProjectDto> Update(ProjectDto dto);
        Task Delete(int Id);
        
        //add here

    }
}
