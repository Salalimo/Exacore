using Exacore.BLL.AuthBL.Interfaces;
using Exacore.Dtos.Account;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;
using System.Threading.Tasks;

namespace Exacore.Controllers.Account
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        IAccountLogic _accountLogic;
        ILoginLogic _loginLogic;
        public AccountController(IAccountLogic accountLogic, ILoginLogic loginLogic)
        {
            _loginLogic = loginLogic;
            _accountLogic = accountLogic;
        }

        [HttpPost, Route("login")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(AccessTokenDto))]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var accessToken = await _loginLogic.Login(dto);
            if (accessToken == null)
                return BadRequest(new { message = "Invalid credentials" });

            return Ok(accessToken);
        }

        //[HttpPost, Route("register")]
        //[SwaggerResponse(HttpStatusCode.OK, typeof(void))]
        //public async Task<IActionResult> Register(RegisterDto dto)
        //{
        //    await _accountLogic.Register(dto);
        //    return Ok("");
        //}

        [HttpPost, Route("activateaccount")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(void))]
        public async Task<IActionResult> ActivateAccount(EmailDto dto)
        {
            await _accountLogic.ActivateAccount(dto);
            return Ok("");
        }

        [HttpPost, Route("forgotpassword")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(string))]
        public async Task<IActionResult> ForgotPassword(EmailDto dto)
        {
            await _accountLogic.ForgotPassword(dto);
            return Ok("");
        }

        [HttpPost, Route("resetpassword")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(string))]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {
            await _accountLogic.ResetPassword(dto);
            return Ok("");
        }


        [HttpPost, Route("resendverification")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(string))]
        public async Task<IActionResult> ResendVerification(EmailDto dto)
        {
            await _accountLogic.ResendVerification(dto);
            return Ok("");
        }

        [HttpGet, Route("roles")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(string))]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _accountLogic.GetRoles();
            return Ok(roles);
        }
    }
}
