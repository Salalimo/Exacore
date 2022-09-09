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
    public class IncidentAlertController : ControllerBase
    {
        IIncidentAlertLogic _incidentalertLogic;

        public IncidentAlertController(IIncidentAlertLogic incidentalertLogic)
        {
            _incidentalertLogic = incidentalertLogic;
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IncidentAlertDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _incidentalertLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IncidentAlertDto))]
        public async Task<IActionResult> Create(IncidentAlertDto dto)
        {
            var vm = await _incidentalertLogic.Add(dto);
            return Ok(vm);
        }
    }
}
