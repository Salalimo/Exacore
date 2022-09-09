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
    public class DepartmentLogic : IDepartmentLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public DepartmentLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<List<DepartmentDto>> GetAll()
        {
            var query = _db.Department
                .Where(t => !t.IsDeleted);
         
            var Departments = await query.ToListAsync();
            return _mapper.Map<List<Department>, List<DepartmentDto>>(Departments);
        }

        public async Task<DepartmentDto> Get(int Id)
        {
            var Department = await _db.Department.Where(t => t.DepartmentId == Id).FirstAsync();
            return _mapper.Map<Department, DepartmentDto>(Department);
        }

        public async Task<DepartmentDto> Add(DepartmentDto dto)
        {
            var Department = _mapper.Map<DepartmentDto, Department>(dto);
            _db.Department.Add(Department);
            await _db.SaveChangesAsync();
            return _mapper.Map<Department, DepartmentDto>(Department);
        }

        public async Task<DepartmentDto> Update(DepartmentDto dto)
        {
            var Department = await _db.Department.Where(t => t.DepartmentId == dto.DepartmentId).FirstAsync();
            _mapper.Map(dto, Department);
            _db.Entry(Department).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<Department, DepartmentDto>(Department);
        }

        public async Task Delete(int Id)
        {
            var Department = await _db.Department.FindAsync(Id);
            _db.Department.Remove(Department);
            await _db.SaveChangesAsync();
        }
        //add here
    }
}