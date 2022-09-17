using AutoMapper;
using Exacore.BLL.AuthBL.Interfaces;
using Exacore.Common;
using Exacore.DAL;
using Exacore.DAL.Entities.Account;
using Exacore.Dtos.Account;
using Exacore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Exacore.BLL.AuthBL
{
    public class UserLogic : IUserLogic
    {
        IMapper _mapper;
        IExacoreContext _db;
        readonly AppSettings _appSettings;
        public UserLogic(IOptions<AppSettings> appSettings, IExacoreContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        public async Task<UserDto> Add(UserDto userDto)
        {
            var user = _mapper.Map<UserDto, User>(userDto);
            var r = new Random();
            string pass = new String(Enumerable.Range(0, 15).Select(n => (Char)(r.Next(32, 127))).ToArray());
            user.Password= pass;
            user.Password = Hash.CreateHash(user.Password, _appSettings.Salt);
            _db.User.Add(user);
            await _db.SaveChangesAsync();
            return _mapper.Map<User, UserDto>(user);
        }

        public async Task<UserDto> Update(UserDto dto)
        {
            var user = await _db.User.Where(t => t.UserId == dto.UserId).FirstAsync();
            string password = user.Password;
            user = _mapper.Map(dto, user);
            user.Password = password;// Hash.CreateHash(user.Password, _appSettings.Salt);

            _db.Entry(user).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<User, UserDto>(user);
        }

        public async Task<UserDto> UpdatePassword(PasswordDto dto)
        {
            var user = await _db.User
                .Include(u => u.Role)
                .Where(t => t.UserId == dto.UserId)
                .FirstAsync();
            user.Password = Hash.CreateHash(dto.Password, _appSettings.Salt);

            _db.Entry(user).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<User, UserDto>(user);
        }


        public async Task<List<UserDto>> GetAll()
        {
            var users = await _db.User
                .Include(u => u.Role)
                .Include(u => u.Contact)
                .ToListAsync();
            return _mapper.Map<List<User>, List<UserDto>>(users);
        }

        public async Task<UserDto> Get(int Id)
        {
            var user = await _db.User
                .Include(u => u.Role)
                .Include(u => u.Contact)
                .FirstAsync(u => u.UserId == Id);
            user.Password = null;
            return _mapper.Map<User, UserDto>(user);
        }

        public async Task Delete(int Id)
        {
            var guids = await _db.UserGuid.Where(g => g.UserId ==  Id).ToListAsync();
            _db.UserGuid.RemoveRange(guids);
            await _db.SaveChangesAsync();

            var user = await _db.User.FindAsync(Id);
            _db.User.Remove(user);
            await _db.SaveChangesAsync();
        }
    }
}
