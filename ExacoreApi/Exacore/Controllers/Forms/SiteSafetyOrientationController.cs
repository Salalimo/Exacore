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
    public class SiteSafetyOrientationController : ControllerBase
    {
        ISiteSafetyOrientationLogic _sitesafetyorientationLogic;

        public SiteSafetyOrientationController(ISiteSafetyOrientationLogic sitesafetyorientationLogic)
        {
            _sitesafetyorientationLogic = sitesafetyorientationLogic;
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(SiteSafetyOrientationDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _sitesafetyorientationLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(SiteSafetyOrientationDto))]
        public async Task<IActionResult> Create(SiteSafetyOrientationDto dto)
        {
            var vm = await _sitesafetyorientationLogic.Add(dto);
            return Ok(vm);
        }
    }
}
