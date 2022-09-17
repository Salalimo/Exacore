using Exacore.Dtos.Forms;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface IJsaLogic
    {
        Task<JsaDto> Get(int Id);
        Task<JsaDto> Add(JsaDto dto);
        Task<JsaDto> Update(JsaDto dto);
    }
}
