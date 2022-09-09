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
    public class DivisionLogic : IDivisionLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public DivisionLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<List<DivisionDto>> GetAll()
        {
            var query = _db.Division
                .Where(t => !t.IsDeleted);
         
            var Divisions = await query.ToListAsync();
            return _mapper.Map<List<Division>, List<DivisionDto>>(Divisions);
        }

        public async Task<DivisionDto> Get(int Id)
        {
            var Division = await _db.Division.Where(t => t.DivisionId == Id).FirstAsync();
            return _mapper.Map<Division, DivisionDto>(Division);
        }

        public async Task<DivisionDto> Add(DivisionDto dto)
        {
            var Division = _mapper.Map<DivisionDto, Division>(dto);
            _db.Division.Add(Division);
            await _db.SaveChangesAsync();
            return _mapper.Map<Division, DivisionDto>(Division);
        }

        public async Task<DivisionDto> Update(DivisionDto dto)
        {
            var Division = await _db.Division.Where(t => t.DivisionId == dto.DivisionId).FirstAsync();
            _mapper.Map(dto, Division);
            _db.Entry(Division).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<Division, DivisionDto>(Division);
        }

        public async Task Delete(int Id)
        {
            var Division = await _db.Division.FindAsync(Id);
            _db.Division.Remove(Division);
            await _db.SaveChangesAsync();
        }
        //add here
    }
}