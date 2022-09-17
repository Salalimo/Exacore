using AutoMapper;
using Exacore.BLL.LookupsBL.Interfaces;
using Exacore.DAL;
using Exacore.DAL.Forms;
using Exacore.Dtos.Forms;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL
{
    public class SiteSafetyOrientationLogic : ISiteSafetyOrientationLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public SiteSafetyOrientationLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<SiteSafetyOrientationDto> Get(int Id)
        {
            var siteSafetyOrientation = await _db.SiteSafetyOrientation
                .Include(s => s.Project)
                .Where(t => t.SiteSafetyOrientationId == Id)
                .FirstAsync();
            return _mapper.Map<SiteSafetyOrientation, SiteSafetyOrientationDto>(siteSafetyOrientation);
        }

        public async Task<SiteSafetyOrientationDto> Add(SiteSafetyOrientationDto dto)
        {
            var siteSafetyOrientation = _mapper.Map<SiteSafetyOrientationDto, SiteSafetyOrientation>(dto);
            var form = new Form();
            form.SiteSafetyOrientations = new List<SiteSafetyOrientation>();
            form.SiteSafetyOrientations.Add(siteSafetyOrientation);
            //var formType = await _db.FormType.Where(t => t.Name == "SiteSafetyOrientation").FirstAsync();
            form.FormName = "Site Safety Orientation";

            _db.Form.Add(form);
            await _db.SaveChangesAsync();
            return _mapper.Map<SiteSafetyOrientation, SiteSafetyOrientationDto>(siteSafetyOrientation);
        }

        public async Task<SiteSafetyOrientationDto> Update(SiteSafetyOrientationDto dto)
        {
            var siteSafetyOrientation = await _db.SiteSafetyOrientation.FindAsync(dto.SiteSafetyOrientationId);
            _mapper.Map(dto, siteSafetyOrientation);
            _db.Entry(siteSafetyOrientation).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<SiteSafetyOrientation, SiteSafetyOrientationDto>(siteSafetyOrientation);
        }
    }
}