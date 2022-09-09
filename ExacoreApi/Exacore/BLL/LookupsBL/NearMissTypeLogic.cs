using AutoMapper;
using Exacore.BLL.LookupsBL.Interfaces;
using Exacore.DAL;
using Exacore.DAL.Lookups;
using Exacore.Dtos.Lookups;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL
{
    public class NearMissTypeLogic : INearMissTypeLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public NearMissTypeLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<List<NearMissTypeDto>> GetAll()
        {
            var query = _db.NearMissType
                .Where(t => !t.IsDeleted);
         
            var NearMissTypes = await query.ToListAsync();
            return _mapper.Map<List<NearMissType>, List<NearMissTypeDto>>(NearMissTypes);
        }

        public async Task<NearMissTypeDto> Get(int Id)
        {
            var NearMissType = await _db.NearMissType.Where(t => t.NearMissTypeId == Id).FirstAsync();
            return _mapper.Map<NearMissType, NearMissTypeDto>(NearMissType);
        }

        public async Task<NearMissTypeDto> Add(NearMissTypeDto dto)
        {
            var NearMissType = _mapper.Map<NearMissTypeDto, NearMissType>(dto);
            _db.NearMissType.Add(NearMissType);
            await _db.SaveChangesAsync();
            return _mapper.Map<NearMissType, NearMissTypeDto>(NearMissType);
        }

        public async Task<NearMissTypeDto> Update(NearMissTypeDto dto)
        {
            var NearMissType = await _db.NearMissType.Where(t => t.NearMissTypeId == dto.NearMissTypeId).FirstAsync();
            _mapper.Map(dto, NearMissType);
            _db.Entry(NearMissType).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<NearMissType, NearMissTypeDto>(NearMissType);
        }

        public async Task Delete(int Id)
        {
            var NearMissType = await _db.NearMissType.FindAsync(Id);
            _db.NearMissType.Remove(NearMissType);
            await _db.SaveChangesAsync();
        }
        //add here
    }
}