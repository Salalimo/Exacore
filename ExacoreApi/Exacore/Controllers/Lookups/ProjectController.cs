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
    public class ProjectController : ControllerBase
    {
        IProjectLogic _projectLogic;

        public ProjectController(IProjectLogic projectLogic)
        {
            _projectLogic = projectLogic;
        }

        [HttpGet, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<ProjectDto>))]
        public async Task<IActionResult> GetAll()
        {
            var vm = await _projectLogic.GetAll();
            return Ok(vm);
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ProjectDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _projectLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ProjectDto))]
        public async Task<IActionResult> Create(ProjectDto dto)
        {
            var vm = await _projectLogic.Add(dto);
            return Ok(vm);
        }

        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ProjectDto))]
        public async Task<IActionResult> Update(ProjectDto dto)
        {
            var vm = await _projectLogic.Update(dto);
            return Ok(vm);
        }

        [HttpDelete, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ProjectDto))]
        public async Task<IActionResult> Delete(int id)
        {
            await _projectLogic.Delete(id);
            return Ok("");
        }
    }
}
