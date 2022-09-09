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
    public class ToolboxMeetingLogic : IToolboxMeetingLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public ToolboxMeetingLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<ToolboxMeetingDto> Get(int Id)
        {
            var ToolboxMeeting = await _db.ToolboxMeeting
                .Include(t => t.Project)
                .Include(t => t.Topics)
                .Include(t => t.Attendances)
                .Where(t => t.ToolboxMeetingId == Id)
                .FirstAsync();
            return _mapper.Map<ToolboxMeeting, ToolboxMeetingDto>(ToolboxMeeting);
        }

        public async Task<ToolboxMeetingDto> Add(ToolboxMeetingDto dto)
        {
            var toolboxMeeting = _mapper.Map<ToolboxMeetingDto, ToolboxMeeting>(dto);
            var form = new Form();
            form.ToolboxMeetings = new List<ToolboxMeeting>();
            form.ToolboxMeetings.Add(toolboxMeeting);
            //var formType = await _db.FormType.Where(t => t.Name == "ToolboxMeeting").FirstAsync();
            form.FormName = "Toolbox Meeting";

            _db.Form.Add(form);
            await _db.SaveChangesAsync();
            return _mapper.Map<ToolboxMeeting, ToolboxMeetingDto>(toolboxMeeting);
        }
    }
}