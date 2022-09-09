using Exacore.Dtos.Forms;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.FormsBL.Interfaces
{
    public interface IFormLogic
    {
        Task<List<FormDto>> GetAll();

        Task<byte[]> Print(int formId);
    }
}
