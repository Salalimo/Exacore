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
    public class NearMissTypeController : ControllerBase
    {
        INearMissTypeLogic _nearmisstypeLogic;

        public NearMissTypeController(INearMissTypeLogic nearmisstypeLogic)
        {
            _nearmisstypeLogic = nearmisstypeLogic;
        }

        [HttpGet, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<NearMissTypeDto>))]
        public async Task<IActionResult> GetAll()
        {
            var vm = await _nearmisstypeLogic.GetAll();
            return Ok(vm);
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(NearMissTypeDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _nearmisstypeLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(NearMissTypeDto))]
        public async Task<IActionResult> Create(NearMissTypeDto dto)
        {
            var vm = await _nearmisstypeLogic.Add(dto);
            return Ok(vm);
        }

        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(NearMissTypeDto))]
        public async Task<IActionResult> Update(NearMissTypeDto dto)
        {
            var vm = await _nearmisstypeLogic.Update(dto);
            return Ok(vm);
        }

        [HttpDelete, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(NearMissTypeDto))]
        public async Task<IActionResult> Delete(int id)
        {
            await _nearmisstypeLogic.Delete(id);
            return Ok("");
        }
    }
}
