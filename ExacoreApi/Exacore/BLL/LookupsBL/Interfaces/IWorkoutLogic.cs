using Exacore.Dtos.Lookups;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface IWorkoutLogic
    {
        Task<WorkoutDto> Get(int Id);
        Task<List<WorkoutDto>> GetAll();
        Task<WorkoutDto> Add(WorkoutDto dto);
        Task<WorkoutDto> Update(WorkoutDto dto);
        Task Delete(int Id);
        
        //add here

    }
}
