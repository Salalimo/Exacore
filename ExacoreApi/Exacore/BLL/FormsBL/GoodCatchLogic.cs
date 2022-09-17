using AutoMapper;
using Exacore.BLL.FormsBL.Interfaces;
using Exacore.DAL;
using Exacore.DAL.Forms;
using Exacore.Dtos.Forms;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Exacore.BLL.FormsBL
{
    public class GoodCatchLogic : IGoodCatchLogic
    {
        IMapper _mapper;
        IExacoreContext _db;
        public GoodCatchLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<GoodCatchDto> Add(GoodCatchDto dto)
        {
            var goodCatch = _mapper.Map<GoodCatchDto, GoodCatch>(dto);
            goodCatch.Project = null;
            goodCatch.Division = null;
            goodCatch.Department = null;
            goodCatch.GoodCatchType = null;
            goodCatch.ControlMethod = null;

            var form = new Form();
            form.GoodCatches = new List<GoodCatch>();
            form.GoodCatches.Add(goodCatch);
            //var formType = await _db.FormType.Where(t => t.Name == "GoodCatch").FirstAsync();
            form.FormName = "Good Catch";
            _db.Form.Add(form);
            await _db.SaveChangesAsync();
            return _mapper.Map<GoodCatch, GoodCatchDto>(goodCatch);
        }

        public async Task<GoodCatchDto> Update(GoodCatchDto dto)
        {
            var goodCatch = await _db.GoodCatch.FindAsync(dto.GoodCatchId);
            _mapper.Map(dto, goodCatch);
            goodCatch.Project = null;
            goodCatch.Division = null;
            goodCatch.Department = null;
            goodCatch.GoodCatchType = null;
            goodCatch.ControlMethod = null;
            _db.Entry(goodCatch).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<GoodCatch, GoodCatchDto>(goodCatch);
        }

        public async Task<GoodCatchDto> Get(int id)
        {
            var goodCatch = await _db.GoodCatch
                .Include(f => f.ControlMethod)
                .Include(f => f.Department)
                .Include(f => f.Division)
                .Include(f => f.GoodCatchType)
                .Include(f => f.Project)
                .Where(f => f.GoodCatchId == id)
                .FirstAsync();
            return _mapper.Map<GoodCatch, GoodCatchDto>(goodCatch);
        }
    }
}