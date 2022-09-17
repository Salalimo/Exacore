using Exacore.BLL.AuthBL.Interfaces;
using Exacore.Dtos.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Exacore.Controllers.Account
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        IRoleLogic _roleLogic;

        public RoleController(IRoleLogic roleLogic)
        {
            _roleLogic = roleLogic;
        }

        [HttpGet, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<RoleDto>))]
        public async Task<IActionResult> GetAll()
        {
            var vm = await _roleLogic.GetAll();
            return Ok(vm);
        }
    }
}
