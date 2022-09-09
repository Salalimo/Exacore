using Exacore.BLL.LookupsBL.Interfaces;
using Exacore.Dtos.Lookups;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Exacore.Controllers.Lookups
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DivisionController : ControllerBase
    {
        IDivisionLogic _divisionLogic;

        public DivisionController(IDivisionLogic divisionLogic)
        {
            _divisionLogic = divisionLogic;
        }

        [HttpGet, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<DivisionDto>))]
        public async Task<IActionResult> GetAll()
        {
            var vm = await _divisionLogic.GetAll();
            return Ok(vm);
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(DivisionDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _divisionLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(DivisionDto))]
        public async Task<IActionResult> Create(DivisionDto dto)
        {
            var vm = await _divisionLogic.Add(dto);
            return Ok(vm);
        }

        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(DivisionDto))]
        public async Task<IActionResult> Update(DivisionDto dto)
        {
            var vm = await _divisionLogic.Update(dto);
            return Ok(vm);
        }

        [HttpDelete, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(DivisionDto))]
        public async Task<IActionResult> Delete(int id)
        {
            await _divisionLogic.Delete(id);
            return Ok("");
        }
    }
}
