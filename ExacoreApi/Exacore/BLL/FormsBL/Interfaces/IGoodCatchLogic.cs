using Exacore.Dtos.Forms;
using System.Threading.Tasks;

namespace Exacore.BLL.FormsBL.Interfaces
{
    public interface IGoodCatchLogic
    {
        Task<GoodCatchDto> Add(GoodCatchDto dto);
        Task<GoodCatchDto> Update(GoodCatchDto dto);
        Task<GoodCatchDto> Get(int id);
    }
}
