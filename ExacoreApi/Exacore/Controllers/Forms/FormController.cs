using Exacore.BLL.FormsBL.Interfaces;
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
    public class FormController : ControllerBase
    {
        IFormLogic _formLogic;
        public FormController(IFormLogic formLogic)
        {
            _formLogic = formLogic;
        }

        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK, typeof(List<FormDto>))]
        public async Task<IActionResult> GetAll()
        {
            var vm = await _formLogic.GetAll();
            return Ok(vm);
        }

        [HttpGet, Route("{formId}/print")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(object))]
        public async Task<IActionResult> Print(int formId)
        {
            var bytes = await _formLogic.Print(formId);
            return File(bytes, "application/pdf", ".pdf");
        }
    }
}

