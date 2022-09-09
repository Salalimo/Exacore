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
    public class AlertTimeLogic : IAlertTimeLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public AlertTimeLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<List<AlertTimeDto>> GetAll()
        {
            var query = _db.AlertTime
                .Where(t => !t.IsDeleted);
         
            var AlertTimes = await query.ToListAsync();
            return _mapper.Map<List<AlertTime>, List<AlertTimeDto>>(AlertTimes);
        }

        public async Task<AlertTimeDto> Get(int Id)
        {
            var AlertTime = await _db.AlertTime.Where(t => t.AlertTimeId == Id).FirstAsync();
            return _mapper.Map<AlertTime, AlertTimeDto>(AlertTime);
        }

        public async Task<AlertTimeDto> Add(AlertTimeDto dto)
        {
            var AlertTime = _mapper.Map<AlertTimeDto, AlertTime>(dto);
            _db.AlertTime.Add(AlertTime);
            await _db.SaveChangesAsync();
            return _mapper.Map<AlertTime, AlertTimeDto>(AlertTime);
        }

        public async Task<AlertTimeDto> Update(AlertTimeDto dto)
        {
            var AlertTime = await _db.AlertTime.Where(t => t.AlertTimeId == dto.AlertTimeId).FirstAsync();
            _mapper.Map(dto, AlertTime);
            _db.Entry(AlertTime).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<AlertTime, AlertTimeDto>(AlertTime);
        }

        public async Task Delete(int Id)
        {
            var AlertTime = await _db.AlertTime.FindAsync(Id);
            _db.AlertTime.Remove(AlertTime);
            await _db.SaveChangesAsync();
        }
        //add here
    }
}