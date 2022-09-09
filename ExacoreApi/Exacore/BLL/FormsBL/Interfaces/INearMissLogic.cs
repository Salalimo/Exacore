using Exacore.Dtos.Forms;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface INearMissLogic
    {
        Task<NearMissDto> Get(int Id);
        Task<NearMissDto> Add(NearMissDto dto);
    }
}
