using Exacore.BLL.FormsBL.Interfaces;
using Exacore.Common.Extensions;
using Exacore.Dtos.Forms;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Exacore.Controllers.Forms
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MyWorkoutController : ControllerBase
    {
        IMyWorkoutLogic _myWorkoutLogic;

        public MyWorkoutController(IMyWorkoutLogic myWorkoutLogic)
        {
            _myWorkoutLogic = myWorkoutLogic;
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(MyWorkoutDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _myWorkoutLogic.Get(id);
            return Ok(vm);
        }

        [HttpGet, Route("leaders")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<WorkoutLeadersDto>))]
        public async Task<IActionResult> GetWorkoutLeaders()
        {
            var vm = await _myWorkoutLogic.GetWorkoutLeaders();
            return Ok(vm);
        }

        [HttpGet, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<MyWorkoutListDto>))]
        public async Task<IActionResult> GetAll()
        {
            int userId = User.Identity.GetUserId();
            var vm = await _myWorkoutLogic.GetAll(userId);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(MyWorkoutDto))]
        public async Task<IActionResult> Create(MyWorkoutDto dto)
        {
            int userID = User.Identity.GetUserId();
            var vm = await _myWorkoutLogic.Add(dto, userID);
            return Ok(vm);
        }

        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(MyWorkoutDto))]
        public async Task<IActionResult> Update(MyWorkoutDto dto)
        {
            var vm = await _myWorkoutLogic.Update(dto);
            return Ok(vm);
        }
    }
}
