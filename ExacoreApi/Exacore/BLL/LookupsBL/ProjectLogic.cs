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
    public class ProjectLogic : IProjectLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public ProjectLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<List<ProjectDto>> GetAll()
        {
            var query = _db.Project
                .Where(t => !t.IsDeleted);
         
            var Projects = await query.ToListAsync();
            return _mapper.Map<List<Project>, List<ProjectDto>>(Projects);
        }

        public async Task<ProjectDto> Get(int Id)
        {
            var Project = await _db.Project.Where(t => t.ProjectId == Id).FirstAsync();
            return _mapper.Map<Project, ProjectDto>(Project);
        }

        public async Task<ProjectDto> Add(ProjectDto dto)
        {
            var Project = _mapper.Map<ProjectDto, Project>(dto);
            _db.Project.Add(Project);
            await _db.SaveChangesAsync();
            return _mapper.Map<Project, ProjectDto>(Project);
        }

        public async Task<ProjectDto> Update(ProjectDto dto)
        {
            var Project = await _db.Project.Where(t => t.ProjectId == dto.ProjectId).FirstAsync();
            _mapper.Map(dto, Project);
            _db.Entry(Project).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<Project, ProjectDto>(Project);
        }

        public async Task Delete(int Id)
        {
            var Project = await _db.Project.FindAsync(Id);
            _db.Project.Remove(Project);
            await _db.SaveChangesAsync();
        }
        //add here
    }
}