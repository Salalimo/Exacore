using AutoMapper;
using Exacore.BLL.AuthBL.Interfaces;
using Exacore.DAL;
using Exacore.DAL.Entities.Account;
using Exacore.Dtos.Account;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Exacore.BLL.AuthBL
{
    public class UserGuidLogic : IUserGuidLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public UserGuidLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<List<UserGuidDto>> GetAll()
        {
            var query = _db.UserGuid
                .Where(t => !t.IsDeleted);
         
            var userGuids = await query.ToListAsync();
            return _mapper.Map<List<UserGuid>, List<UserGuidDto>>(userGuids);
        }

        public async Task<UserGuidDto> Get(int Id)
        {
            var userGuid = await _db.UserGuid.Where(t => t.UserGuidId == Id).FirstAsync();
            return _mapper.Map<UserGuid, UserGuidDto>(userGuid);
        }

        public async Task<UserGuidDto> Add(UserGuidDto dto)
        {
            var userGuid = _mapper.Map<UserGuidDto, UserGuid>(dto);
            _db.UserGuid.Add(userGuid);
            await _db.SaveChangesAsync();
            return _mapper.Map<UserGuid, UserGuidDto>(userGuid);
        }

        public async Task<UserGuidDto> Update(UserGuidDto dto)
        {
            var userGuid = await _db.UserGuid.Where(t => t.UserGuidId == dto.UserGuidId).FirstAsync();
            _mapper.Map(dto, userGuid);
            _db.Entry(userGuid).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<UserGuid, UserGuidDto>(userGuid);
        }

        public async Task Delete(int Id)
        {
            var userGuid = await _db.UserGuid.FindAsync(Id);
            _db.UserGuid.Remove(userGuid);
            await _db.SaveChangesAsync();
        }
        //add here
    }
}