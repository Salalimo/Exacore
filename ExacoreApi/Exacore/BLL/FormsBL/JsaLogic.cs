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
    public class JsaLogic : IJsaLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public JsaLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<JsaDto> Get(int Id)
        {
            var Jsa = await _db.Jsa
                .Include(j => j.StepActions)
                .Include(j => j.CrewAttendances)
                .Where(t => t.JsaId == Id)
                .FirstAsync();
            return _mapper.Map<Jsa, JsaDto>(Jsa);
        }

        public async Task<JsaDto> Add(JsaDto dto)
        {
            var jsa = _mapper.Map<JsaDto, Jsa>(dto);
            var form = new Form();
            form.Jsas= new List<Jsa>();
            form.Jsas.Add(jsa);
            //var formType = await _db.FormType.Where(t => t.Name == "Jsa").FirstAsync();
            form.FormName = "Jsa";

            _db.Form.Add(form);
            await _db.SaveChangesAsync();
            return _mapper.Map<Jsa, JsaDto>(jsa);
        }
    }
}