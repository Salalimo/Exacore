using Exacore.Dtos.Forms;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface ISiteSafetyOrientationLogic
    {
        Task<SiteSafetyOrientationDto> Get(int Id);
        Task<SiteSafetyOrientationDto> Add(SiteSafetyOrientationDto dto);
    }
}
