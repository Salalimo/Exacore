using Exacore.BLL.FormsBL.Interfaces;
using Exacore.Dtos.Forms;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;
using System.Threading.Tasks;

namespace Exacore.Controllers.Forms
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class GoodCatchController : ControllerBase
    {
        IGoodCatchLogic _goodCatchLogic;
        public GoodCatchController(IGoodCatchLogic goodCatchLogic)
        {
            _goodCatchLogic = goodCatchLogic;
        }

        [HttpPost, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(GoodCatchDto))]
        public async Task<IActionResult> Create(GoodCatchDto dto)
        {
            var vm = await _goodCatchLogic.Add(dto);
            return Ok(vm);
        }
        [HttpPut, Route("")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(GoodCatchDto))]
        public async Task<IActionResult> Update(GoodCatchDto dto)
        {
            var vm = await _goodCatchLogic.Update(dto);
            return Ok(vm);
        }


        [HttpGet, Route("{id}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(GoodCatchDto))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await _goodCatchLogic.Get(id);
            return Ok(vm);
        }
    }
}
