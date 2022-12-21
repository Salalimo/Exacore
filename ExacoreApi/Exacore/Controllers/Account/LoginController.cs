using Exacore.BLL.AuthBL.Interfaces;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace Exacore.Controllers.Account
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        ILoginLogic _loginLogic;
        public LoginController(ILoginLogic loginLogic)
        {
            _loginLogic = loginLogic;
        }

        public class AuthenticateRequest
        {
            [Required]
            public string IdToken { get; set; }
            public string AccessToken { get; set; }
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateRequest data)
        {
            try
            {
                GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();
                settings.Audience = new List<string>() { "362693061589-kiivhaha3sgmvqte73dqur0rlktf08ts.apps.googleusercontent.com" };
                GoogleJsonWebSignature.Payload payload =
                    GoogleJsonWebSignature.ValidateAsync(data.IdToken, settings).Result;

                var accessToken = await _loginLogic.GenerateToken(payload.Email);

                if (accessToken == null)
                    return BadRequest(new { message = "Account not registered" });

                return Ok(accessToken);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.ToString() });
            }
        }

        [Authorize]
        [HttpPost("secured")]
        public IActionResult Secured()
        {
            return Ok("OK");
        }
    }

}
