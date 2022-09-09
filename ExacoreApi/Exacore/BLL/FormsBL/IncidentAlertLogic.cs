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
    public class IncidentAlertLogic : IIncidentAlertLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public IncidentAlertLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<IncidentAlertDto> Get(int Id)
        {
            var IncidentAlert = await _db.IncidentAlert
                .Include(x => x.AlertTime)
                .Include(x => x.Project)
                .Where(t => t.IncidentAlertId == Id)
                .FirstAsync();
            return _mapper.Map<IncidentAlert, IncidentAlertDto>(IncidentAlert);
        }

        public async Task<IncidentAlertDto> Add(IncidentAlertDto dto)
        {
            var incidentAlert = _mapper.Map<IncidentAlertDto, IncidentAlert>(dto);
            var form = new Form();
            form.IncidentAlerts = new List<IncidentAlert>();
            form.IncidentAlerts.Add(incidentAlert);
            //var formType = await _db.FormType.Where(t => t.Name == "IncidentAlert").FirstAsync();
            form.FormName = "Incident Alert";

            _db.Form.Add(form);
            await _db.SaveChangesAsync();
            return _mapper.Map<IncidentAlert, IncidentAlertDto>(incidentAlert);
        }
    }
}