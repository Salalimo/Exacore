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
    public class UserController : ControllerBase
    {

        IAccountLogic _accountLogic;
        IUserLogic _userLogic;

        public UserController(IUserLogic userLogic, IAccountLogic accountLogic)
        {
            _userLogic = userLogic;
            _accountLogic = accountLogic;
        }

        [HttpGet, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<UserDto>))]
        public async Task<IActionResult> GetAll()
        {
            var vm = await _userLogic.GetAll();
            return Ok(vm);
        }

        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(UserDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _userLogic.Get(id);
            return Ok(vm);
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(UserDto))]
        public async Task<IActionResult> Create(UserDto dto)
        {
            var registerDto = new RegisterDto()
            {
                User = dto,
                Role = new RoleDto() { RoleId = dto.RoleId },
            };
            await _accountLogic.Register(registerDto);
            //var vm = await _userLogic.Add(dto);
            return Ok("");
        }

        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(UserDto))]
        public async Task<IActionResult> Update(UserDto dto)
        {
            var vm = await _userLogic.Update(dto);
            return Ok(vm);
        }

        [HttpDelete, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(void))]
        public async Task<IActionResult> Delete(int id)
        {
            await _userLogic.Delete(id);
            return Ok("");
        }
    }
}
