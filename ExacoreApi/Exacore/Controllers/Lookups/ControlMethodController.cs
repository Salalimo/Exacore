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
    public class ControlMethodController : ControllerBase
    {
        IControlMethodLogic _controlmethodLogic;

        public ControlMethodController(IControlMethodLogic controlmethodLogic)
        {
            _controlmethodLogic = controlmethodLogic;
        }

        [HttpGet, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<ControlMethodDto>))]
        public async Task<IActionResult> GetAll()
        {
            var vm = await _controlmethodLogic.GetAll();
            return Ok(vm);
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ControlMethodDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _controlmethodLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ControlMethodDto))]
        public async Task<IActionResult> Create(ControlMethodDto dto)
        {
            var vm = await _controlmethodLogic.Add(dto);
            return Ok(vm);
        }

        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ControlMethodDto))]
        public async Task<IActionResult> Update(ControlMethodDto dto)
        {
            var vm = await _controlmethodLogic.Update(dto);
            return Ok(vm);
        }

        [HttpDelete, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ControlMethodDto))]
        public async Task<IActionResult> Delete(int id)
        {
            await _controlmethodLogic.Delete(id);
            return Ok("");
        }
    }
}
