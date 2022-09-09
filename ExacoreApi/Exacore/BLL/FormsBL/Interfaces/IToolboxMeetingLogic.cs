using Exacore.Dtos.Forms;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface IToolboxMeetingLogic
    {
        Task<ToolboxMeetingDto> Get(int Id);
        Task<ToolboxMeetingDto> Add(ToolboxMeetingDto dto);
    }
}
