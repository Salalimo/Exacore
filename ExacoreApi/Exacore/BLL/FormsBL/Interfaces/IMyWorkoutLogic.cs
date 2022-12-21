using Exacore.Dtos.Forms;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.FormsBL.Interfaces
{
    public interface IMyWorkoutLogic
    {
        Task<List<WorkoutLeadersDto>> GetWorkoutLeaders();
        Task<List<MyWorkoutListDto>> GetAll(int userId);
        Task<MyWorkoutDto> Get(int id);
        Task<MyWorkoutDto> Add(MyWorkoutDto dto, int userId);
        Task<MyWorkoutDto> Update(MyWorkoutDto dto);
    }
}
