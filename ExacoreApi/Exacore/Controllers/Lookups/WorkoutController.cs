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
    public class WorkoutController : ControllerBase
    {
        IWorkoutLogic _workoutLogic;

        public WorkoutController(IWorkoutLogic workoutLogic)
        {
            _workoutLogic = workoutLogic;
        }

        [HttpGet, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<WorkoutDto>))]
        public async Task<IActionResult> GetAll()
        {
            var vm = await _workoutLogic.GetAll();
            return Ok(vm);
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(WorkoutDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _workoutLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(WorkoutDto))]
        public async Task<IActionResult> Create(WorkoutDto dto)
        {
            var vm = await _workoutLogic.Add(dto);
            return Ok(vm);
        }

        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(WorkoutDto))]
        public async Task<IActionResult> Update(WorkoutDto dto)
        {
            var vm = await _workoutLogic.Update(dto);
            return Ok(vm);
        }

        [HttpDelete, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(WorkoutDto))]
        public async Task<IActionResult> Delete(int id)
        {
            await _workoutLogic.Delete(id);
            return Ok("");
        }
    }
}
