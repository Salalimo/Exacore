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
    public class DepartmentController : ControllerBase
    {
        IDepartmentLogic _departmentLogic;

        public DepartmentController(IDepartmentLogic departmentLogic)
        {
            _departmentLogic = departmentLogic;
        }

        [HttpGet, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<DepartmentDto>))]
        public async Task<IActionResult> GetAll()
        {
            var vm = await _departmentLogic.GetAll();
            return Ok(vm);
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(DepartmentDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _departmentLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(DepartmentDto))]
        public async Task<IActionResult> Create(DepartmentDto dto)
        {
            var vm = await _departmentLogic.Add(dto);
            return Ok(vm);
        }

        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(DepartmentDto))]
        public async Task<IActionResult> Update(DepartmentDto dto)
        {
            var vm = await _departmentLogic.Update(dto);
            return Ok(vm);
        }

        [HttpDelete, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(DepartmentDto))]
        public async Task<IActionResult> Delete(int id)
        {
            await _departmentLogic.Delete(id);
            return Ok("");
        }
    }
}
