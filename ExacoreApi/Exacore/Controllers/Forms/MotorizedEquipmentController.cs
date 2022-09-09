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
    public class MotorizedEquipmentController : ControllerBase
    {
        IMotorizedEquipmentLogic _motorizedequipmentLogic;

        public MotorizedEquipmentController(IMotorizedEquipmentLogic motorizedequipmentLogic)
        {
            _motorizedequipmentLogic = motorizedequipmentLogic;
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(MotorizedEquipmentDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _motorizedequipmentLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(MotorizedEquipmentDto))]
        public async Task<IActionResult> Create(MotorizedEquipmentDto dto)
        {
            var vm = await _motorizedequipmentLogic.Add(dto);
            return Ok(vm);
        }
    }
}
