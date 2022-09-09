using Exacore.BLL.AuthBL.Interfaces;
using Exacore.Dtos.Account;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Exacore.Controllers.Account
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserGuidController : ControllerBase
    {
        IUserGuidLogic _userGuidLogic;

        public UserGuidController(IUserGuidLogic userGuidLogic)
        {
            _userGuidLogic = userGuidLogic;
        }

        [HttpGet, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<UserGuidDto>))]
        public async Task<IActionResult> GetAll()
        {
            var vm = await _userGuidLogic.GetAll();
            return Ok(vm);
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(UserGuidDto))]
        public async Task<IActionResult> Get(int Id)
        {
            var vm = await _userGuidLogic.Get(Id);
            return Ok(vm);
        }

        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(UserGuidDto))]
        public async Task<IActionResult> Get(UserGuidDto dto)
        {
            var vm = await _userGuidLogic.Update(dto);
            return Ok(vm);
        }

        [HttpDelete, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(UserGuidDto))]
        public async Task<IActionResult> Delete(int Id)
        {
            await _userGuidLogic.Delete(Id);
            return Ok("");
        }
    }
}
