using Exacore.Dtos.Forms;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface IMotorizedEquipmentLogic
    {
        Task<MotorizedEquipmentDto> Get(int Id);
        Task<MotorizedEquipmentDto> Add(MotorizedEquipmentDto dto);
        Task<MotorizedEquipmentDto> Update(MotorizedEquipmentDto dto);
    }
}
