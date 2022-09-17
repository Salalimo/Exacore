using Exacore.Common;
using Microsoft.AspNetCore.Mvc;
using NSwag;
using NSwag.Annotations;
using NSwag.CodeGeneration.TypeScript;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Exacore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UtilsController : ControllerBase
    {
        [HttpGet, Route("angular")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(string))]
        public async Task<IActionResult> AngularServiceCode()
        {
            var document = await OpenApiDocument.FromUrlAsync("https://localhost:44302/swagger/v1/swagger.json");

            var settings = new TypeScriptClientGeneratorSettings
            {
                ClassName = "{controller}Client",
                ClientBaseClass = "ClientBase",
                Template = TypeScriptTemplate.Angular,
                UseGetBaseUrlMethod = true,
                RxJsVersion = 7,
                HttpClass = HttpClass.HttpClient,
                GenerateClientClasses = true,
                GenerateClientInterfaces = true,
            };

            var generator = new TypeScriptClientGenerator(document, settings);
            var code = generator.GenerateFile();
            code = "import { ClientBase } from './client.base';\n" + code;
            code = code.Replace("OpaqueToken", "InjectionToken");
            return Ok(code);
        }

        [HttpGet, Route("email")]
        public IActionResult TestEmail()
        {
            try
            {
                var emailer = new Emailer();
                emailer.SendEmail("test", "body", new string[] { "salalimo@hotmail.com" }, "info@royalgrandcondominium.com");
                return Ok("");
            }

            catch (Exception ex)
            {
                return Ok(ex.ToString());
            }
        }
    }
}
