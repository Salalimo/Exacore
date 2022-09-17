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
    public class JsaController : ControllerBase
    {
        IJsaLogic _jsaLogic;

        public JsaController(IJsaLogic jsaLogic)
        {
            _jsaLogic = jsaLogic;
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(JsaDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _jsaLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(JsaDto))]
        public async Task<IActionResult> Create(JsaDto dto)
        {
            var vm = await _jsaLogic.Add(dto);
            return Ok(vm);
        }


        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(JsaDto))]
        public async Task<IActionResult> Update(JsaDto dto)
        {
            var vm = await _jsaLogic.Update(dto);
            return Ok(vm);
        }
    }
}
