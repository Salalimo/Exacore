using Exacore.Dtos.Lookups;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface INearMissTypeLogic
    {
        Task<NearMissTypeDto> Get(int Id);
        Task<List<NearMissTypeDto>> GetAll();
        Task<NearMissTypeDto> Add(NearMissTypeDto dto);
        Task<NearMissTypeDto> Update(NearMissTypeDto dto);
        Task Delete(int Id);
        
        //add here

    }
}
