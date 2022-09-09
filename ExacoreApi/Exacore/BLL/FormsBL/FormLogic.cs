using AutoMapper;
using Exacore.BLL.PdfBL;
using Exacore.DAL;
using Exacore.DAL.Forms;
using Exacore.Dtos.Forms;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Exacore.BLL.FormsBL.Interfaces
{
    public class FormLogic : IFormLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public FormLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<List<FormDto>> GetAll()
        {
            var forms = await _db.Form
                .Include(f => f.IncidentAlerts)
                .Include(f => f.GoodCatches)
                .Include(f => f.Jsas)
                .Include(f => f.SiteSafetyOrientations)
                .Include(f => f.MotorizedEquipments)
                .Include(f => f.NearMisses)
                .Include(f => f.ToolboxMeetings)
                .ToListAsync();
            return _mapper.Map<List<Form>, List<FormDto>>(forms);
        }

        async Task<Form> Get (int formId)
        {
            var form = await _db.Form
               .Include(f => f.IncidentAlerts)
               .Include(f => f.GoodCatches)
               .Include(f => f.Jsas)
               .Include(f => f.SiteSafetyOrientations)
               .Include(f => f.MotorizedEquipments)
               .Include(f => f.NearMisses)
               .Include(f => f.ToolboxMeetings)
               .Where(f => f.FormId == formId)
               .FirstAsync();
            return form;
        }

        public async Task<byte[]> Print(int formId)
        {
            var form = await Get(formId);

            switch(form.FormName)
            {
                case "Good Catch":
                    return new GoodCatchPdf().CreatePdf();
                case "Incident Alert":
                    return new IncidentAlertPdf().CreatePdf();
                case "Jsa":
                    return new JsaPdf().CreatePdf();
                case "Near Miss":
                    return new NearMissPdf().CreatePdf();
                case "Motorized Equipment":
                    return new MotorizedEquipmentPdf().CreatePdf();
                case "Site Safety Orientation":
                    return new SiteSafetyOrientationPdf().CreatePdf();
                case "Toolbox Meeting":
                    return new ToolboxMeetingPdf().CreatePdf();
                default:
                    return null;
            }
        }
    }
}
