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
    public class ControlMethodLogic : IControlMethodLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public ControlMethodLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<List<ControlMethodDto>> GetAll()
        {
            var query = _db.ControlMethod
                .Where(t => !t.IsDeleted);
         
            var ControlMethods = await query.ToListAsync();
            return _mapper.Map<List<ControlMethod>, List<ControlMethodDto>>(ControlMethods);
        }

        public async Task<ControlMethodDto> Get(int Id)
        {
            var ControlMethod = await _db.ControlMethod.Where(t => t.ControlMethodId == Id).FirstAsync();
            return _mapper.Map<ControlMethod, ControlMethodDto>(ControlMethod);
        }

        public async Task<ControlMethodDto> Add(ControlMethodDto dto)
        {
            var ControlMethod = _mapper.Map<ControlMethodDto, ControlMethod>(dto);
            _db.ControlMethod.Add(ControlMethod);
            await _db.SaveChangesAsync();
            return _mapper.Map<ControlMethod, ControlMethodDto>(ControlMethod);
        }

        public async Task<ControlMethodDto> Update(ControlMethodDto dto)
        {
            var ControlMethod = await _db.ControlMethod.Where(t => t.ControlMethodId == dto.ControlMethodId).FirstAsync();
            _mapper.Map(dto, ControlMethod);
            _db.Entry(ControlMethod).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<ControlMethod, ControlMethodDto>(ControlMethod);
        }

        public async Task Delete(int Id)
        {
            var ControlMethod = await _db.ControlMethod.FindAsync(Id);
            _db.ControlMethod.Remove(ControlMethod);
            await _db.SaveChangesAsync();
        }
        //add here
    }
}