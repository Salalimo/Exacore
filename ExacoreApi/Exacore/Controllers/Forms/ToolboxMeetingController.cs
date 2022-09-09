using Exacore.BLL.LookupsBL.Interfaces;
using Exacore.Dtos.Forms;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;
using System.Threading.Tasks;

namespace Exacore.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ToolboxMeetingController : ControllerBase
    {
        IToolboxMeetingLogic _toolboxmeetingLogic;

        public ToolboxMeetingController(IToolboxMeetingLogic toolboxmeetingLogic)
        {
            _toolboxmeetingLogic = toolboxmeetingLogic;
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ToolboxMeetingDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _toolboxmeetingLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ToolboxMeetingDto))]
        public async Task<IActionResult> Create(ToolboxMeetingDto dto)
        {
            var vm = await _toolboxmeetingLogic.Add(dto);
            return Ok(vm);
        }
    }
}
