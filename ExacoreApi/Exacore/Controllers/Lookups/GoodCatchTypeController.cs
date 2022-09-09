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
    public class GoodCatchTypeController : ControllerBase
    {
        IGoodCatchTypeLogic _goodcatchtypeLogic;

        public GoodCatchTypeController(IGoodCatchTypeLogic goodcatchtypeLogic)
        {
            _goodcatchtypeLogic = goodcatchtypeLogic;
        }

        [HttpGet, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<GoodCatchTypeDto>))]
        public async Task<IActionResult> GetAll()
        {
            var vm = await _goodcatchtypeLogic.GetAll();
            return Ok(vm);
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(GoodCatchTypeDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _goodcatchtypeLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(GoodCatchTypeDto))]
        public async Task<IActionResult> Create(GoodCatchTypeDto dto)
        {
            var vm = await _goodcatchtypeLogic.Add(dto);
            return Ok(vm);
        }

        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(GoodCatchTypeDto))]
        public async Task<IActionResult> Update(GoodCatchTypeDto dto)
        {
            var vm = await _goodcatchtypeLogic.Update(dto);
            return Ok(vm);
        }

        [HttpDelete, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(GoodCatchTypeDto))]
        public async Task<IActionResult> Delete(int id)
        {
            await _goodcatchtypeLogic.Delete(id);
            return Ok("");
        }
    }
}
