using AutoMapper;
using Exacore.BLL.PdfBL.Interfaces;
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

        IJsaPdf _jsaPdf;
        INearMissPdf _nearMissPdf;
        IGoodCatchPdf _goodCatchPdf;
        IIncidentAlertPdf _incidentAlertPdf;
        IToolboxMeetingPdf _toolboxMeetingPdf;
        IMotorizedEquipmentPdf _motorizedEquipmentPdf;
        ISiteSafetyOrientationPdf _siteSafetyOrientationPdf;


        public FormLogic(IMapper mapper, IExacoreContext db, IGoodCatchPdf goodCatchPdf, IIncidentAlertPdf incidentAlertPdf,
            IJsaPdf jsaPdf, IMotorizedEquipmentPdf motorizedEquipmentPdf, INearMissPdf nearMissPdf, 
            ISiteSafetyOrientationPdf siteSafetyOrientationPdf, IToolboxMeetingPdf toolboxMeetingPdf)
        {
            _db = db;
            _mapper = mapper;
            _goodCatchPdf = goodCatchPdf;
            _incidentAlertPdf = incidentAlertPdf;
            _jsaPdf = jsaPdf;
            _motorizedEquipmentPdf = motorizedEquipmentPdf;
            _nearMissPdf = nearMissPdf;
            _siteSafetyOrientationPdf = siteSafetyOrientationPdf;
            _toolboxMeetingPdf = toolboxMeetingPdf; 
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
                    return _goodCatchPdf.CreatePdf(formId);
                case "Incident Alert":
                    return _incidentAlertPdf.CreatePdf(formId);
                case "Jsa":
                    return _jsaPdf.CreatePdf(formId);
                case "Near Miss":
                    return _nearMissPdf.CreatePdf(formId);
                case "Motorized Equipment":
                    return _motorizedEquipmentPdf.CreatePdf(formId);
                case "Site Safety Orientation":
                    return _siteSafetyOrientationPdf.CreatePdf(formId);
                case "Toolbox Meeting":
                    return _toolboxMeetingPdf.CreatePdf(formId);
                default:
                    return null;
            }
        }
    }
}
