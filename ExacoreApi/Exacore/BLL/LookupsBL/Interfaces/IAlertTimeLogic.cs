using Exacore.Dtos.Lookups;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface IAlertTimeLogic
    {
        Task<AlertTimeDto> Get(int Id);
        Task<List<AlertTimeDto>> GetAll();
        Task<AlertTimeDto> Add(AlertTimeDto dto);
        Task<AlertTimeDto> Update(AlertTimeDto dto);
        Task Delete(int Id);
        
        //add here

    }
}
