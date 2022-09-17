using AutoMapper;
using Exacore.BLL.AuthBL.Interfaces;
using Exacore.DAL;
using Exacore.DAL.Entities.Account;
using Exacore.Dtos.Account;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL
{
    public class RoleLogic : IRoleLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public RoleLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<List<RoleDto>> GetAll()
        {
            var roles =await _db.Roles
               .Where(t => !t.IsDeleted)
               .ToListAsync();
            return _mapper.Map<List<Role>, List<RoleDto>>(roles);
        }
    }
}
