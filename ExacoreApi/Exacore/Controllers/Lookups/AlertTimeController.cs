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
    public class AlertTimeController : ControllerBase
    {
        IAlertTimeLogic _alerttimeLogic;

        public AlertTimeController(IAlertTimeLogic alerttimeLogic)
        {
            _alerttimeLogic = alerttimeLogic;
        }

        [HttpGet, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<AlertTimeDto>))]
        public async Task<IActionResult> GetAll()
        {
            var vm = await _alerttimeLogic.GetAll();
            return Ok(vm);
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(AlertTimeDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _alerttimeLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(AlertTimeDto))]
        public async Task<IActionResult> Create(AlertTimeDto dto)
        {
            var vm = await _alerttimeLogic.Add(dto);
            return Ok(vm);
        }

        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(AlertTimeDto))]
        public async Task<IActionResult> Update(AlertTimeDto dto)
        {
            var vm = await _alerttimeLogic.Update(dto);
            return Ok(vm);
        }

        [HttpDelete, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(AlertTimeDto))]
        public async Task<IActionResult> Delete(int id)
        {
            await _alerttimeLogic.Delete(id);
            return Ok("");
        }
    }
}
