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
    public class GoodCatchTypeLogic : IGoodCatchTypeLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public GoodCatchTypeLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<List<GoodCatchTypeDto>> GetAll()
        {
            var query = _db.GoodCatchType
                .Where(t => !t.IsDeleted);
         
            var GoodCatchTypes = await query.ToListAsync();
            return _mapper.Map<List<GoodCatchType>, List<GoodCatchTypeDto>>(GoodCatchTypes);
        }

        public async Task<GoodCatchTypeDto> Get(int Id)
        {
            var GoodCatchType = await _db.GoodCatchType.Where(t => t.GoodCatchTypeId == Id).FirstAsync();
            return _mapper.Map<GoodCatchType, GoodCatchTypeDto>(GoodCatchType);
        }

        public async Task<GoodCatchTypeDto> Add(GoodCatchTypeDto dto)
        {
            var GoodCatchType = _mapper.Map<GoodCatchTypeDto, GoodCatchType>(dto);
            _db.GoodCatchType.Add(GoodCatchType);
            await _db.SaveChangesAsync();
            return _mapper.Map<GoodCatchType, GoodCatchTypeDto>(GoodCatchType);
        }

        public async Task<GoodCatchTypeDto> Update(GoodCatchTypeDto dto)
        {
            var GoodCatchType = await _db.GoodCatchType.Where(t => t.GoodCatchTypeId == dto.GoodCatchTypeId).FirstAsync();
            _mapper.Map(dto, GoodCatchType);
            _db.Entry(GoodCatchType).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<GoodCatchType, GoodCatchTypeDto>(GoodCatchType);
        }

        public async Task Delete(int Id)
        {
            var GoodCatchType = await _db.GoodCatchType.FindAsync(Id);
            _db.GoodCatchType.Remove(GoodCatchType);
            await _db.SaveChangesAsync();
        }
        //add here
    }
}