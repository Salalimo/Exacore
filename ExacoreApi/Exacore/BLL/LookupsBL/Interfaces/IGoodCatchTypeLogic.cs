using Exacore.Dtos.Lookups;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL.Interfaces
{
    public interface IGoodCatchTypeLogic
    {
        Task<GoodCatchTypeDto> Get(int Id);
        Task<List<GoodCatchTypeDto>> GetAll();
        Task<GoodCatchTypeDto> Add(GoodCatchTypeDto dto);
        Task<GoodCatchTypeDto> Update(GoodCatchTypeDto dto);
        Task Delete(int Id);
        
        //add here

    }
}
