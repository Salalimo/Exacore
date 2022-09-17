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
    public class NearMissController : ControllerBase
    {
        INearMissLogic _nearmissLogic;

        public NearMissController(INearMissLogic nearmissLogic)
        {
            _nearmissLogic = nearmissLogic;
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(NearMissDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _nearmissLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(NearMissDto))]
        public async Task<IActionResult> Create(NearMissDto dto)
        {
            var vm = await _nearmissLogic.Add(dto);
            return Ok(vm);
        }

        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(NearMissDto))]
        public async Task<IActionResult> Update(NearMissDto dto)
        {
            var vm = await _nearmissLogic.Update(dto);
            return Ok(vm);
        }
    }
}
