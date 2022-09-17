using Exacore.Dtos.Forms;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface IIncidentAlertLogic
    {
        Task<IncidentAlertDto> Get(int Id);
        Task<IncidentAlertDto> Add(IncidentAlertDto dto);
        Task<IncidentAlertDto> Update(IncidentAlertDto dto);
    }
}
