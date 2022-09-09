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
    public class NearMissLogic : INearMissLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public NearMissLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<NearMissDto> Get(int Id)
        {
            var NearMiss = await _db.NearMiss
                .Include(n => n.Project)
                .Include(n => n.Division)
                .Include(n => n.Department)
                .Include(n => n.ControlMethod)
                .Include(n => n.NearMissType)
                .Where(t => t.NearMissId == Id)
                .FirstAsync();
            return _mapper.Map<NearMiss, NearMissDto>(NearMiss);
        }

        public async Task<NearMissDto> Add(NearMissDto dto)
        {
            var nearMiss = _mapper.Map<NearMissDto, NearMiss>(dto);
            var form = new Form();
            form.NearMisses = new List<NearMiss>();
            form.NearMisses.Add(nearMiss);
            //var formType = await _db.FormType.Where(t => t.Name == "NearMiss").FirstAsync();
            form.FormName = "Near Miss";

            _db.Form.Add(form);
            await _db.SaveChangesAsync();
            return _mapper.Map<NearMiss, NearMissDto>(nearMiss);
        }
    }
}