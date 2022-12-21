using AutoMapper;
using Exacore.AuhBL.AuthenticationBL.Helpers;
using Exacore.BLL.AuthBL.Interfaces;
using Exacore.Common;
using Exacore.DAL;
using Exacore.DAL.Entities.Account;
using Exacore.Dtos.Account;
using Exacore.Exceptions;
using Exacore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Role = Exacore.DAL.Entities.Account.Role;

namespace Exacore.BLL.AuthBL
{
    public class AccountLogic : IAccountLogic
    {
        IMapper _mapper;
        IExacoreContext _db;
        readonly AppSettings _appSettings;
        public AccountLogic(IOptions<AppSettings> appSettings, IExacoreContext db, IMapper mapper, IUserGuidLogic userGuidLogic)
        {
            _db = db;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        public async Task Register(RegisterDto dto)
        {
            var temp = await _db.User.FirstOrDefaultAsync(u => u.Email == dto.User.Email);
            if (temp != null)
                throw new ApiException("User is already registered.");

            var role = await _db.Roles.FindAsync(dto.Role.RoleId);
            var contact = _mapper.Map<ContactDto, Contact>(dto.Contact);
            var user = _mapper.Map<UserDto, User>(dto.User);

            user.Role = role;
            var r = new Random();
            string pass = new String(Enumerable.Range(0, 15).Select(n => (Char)(r.Next(32, 127))).ToArray());
            user.Password = pass;
            //user.Contact = contact;

            _db.User.Add(user);
            _db.Entry(user).State = EntityState.Added;
            await _db.SaveChangesAsync();

            string guid = EmailHelper.SendVerificationEmail(_appSettings, user.Email, user.Contact.FirstName, user.Contact.LastName);
            await AddGuid(guid, user.UserId.Value, UserGuids.ForgotPassword);
        }
        public async Task ActivateAccount(EmailDto dto)
        {
            var user = await _db.User
                .Include(u => u.Contact)
                .Where(u => u.Email == dto.Email)
                .FirstOrDefaultAsync();

            if (user == null)
                throw new ApiException("Email is not registered in our system.");

            if (user.IsActive)
                throw new ApiException("Account is already active.");


            var userGuid = await GetGuid(dto.Guid, user.UserId.Value, UserGuids.Verification);
            if (userGuid == null)
                throw new ApiException("An error occured please try logging in.");

            if (userGuid.Expires < DateTime.Now)
                throw new ApiException("Activation link expired.");

            user.IsActive = true;
            await _db.SaveChangesAsync();
            await DeleteGuid(dto.Guid, user.UserId.Value, UserGuids.Verification);
        }

        public async Task ForgotPassword(EmailDto dto)
        {
            var user = await _db.User
                .Include(u => u.Contact)
                .Where(u => u.Email == dto.Email)
                .FirstOrDefaultAsync();
            if (user == null)
                throw new ApiException("Email is not registered in our system.");

            string guid = EmailHelper.SendForgotPasswordEmail(_appSettings, user.Email, user.Contact.FirstName, user.Contact.LastName);
            await AddGuid(guid, user.UserId.Value, UserGuids.ForgotPassword);
        }

        public async Task ResetPassword(ResetPasswordDto dto)
        {
            var user = await _db.User
                .Include(u => u.Contact)
                .Where(u => u.Email == dto.Email)
                .FirstOrDefaultAsync();
            if (user == null)
                return;

            var userGuid = await GetGuid(dto.Guid, user.UserId.Value, UserGuids.ForgotPassword);

            if (userGuid == null)
                throw new ApiException("The reset password link has expired.");

            if (userGuid.Expires < DateTime.Now)
                throw new ApiException("The reset password link has expired.");

            user.Password = Hash.CreateHash(dto.Password, _appSettings.Salt);
            user.IsActive = true;
            await _db.SaveChangesAsync();
            await DeleteGuid(dto.Guid, user.UserId.Value, UserGuids.ForgotPassword);
        }


        public async Task ResendVerification(EmailDto dto)
        {
            var user = await _db.User
              .Include(u => u.Contact)
              .Where(u => u.Email == dto.Email)
              .FirstOrDefaultAsync();
            if (user == null)
                return;

            string guid = EmailHelper.SendVerificationEmail(_appSettings, user.Email, user.Contact.FirstName, user.Contact.LastName);
            await AddGuid(guid, user.UserId.Value, UserGuids.Verification);
        }

        public async Task<List<RoleDto>> GetRoles()
        {
            var roles = await _db.Roles
                .Where(r => !r.IsDeleted)
                .ToListAsync();
            return _mapper.Map<List<Role>, List<RoleDto>>(roles);
        }

        public async Task<UserGuid> GetGuid(string guid, int userId, UserGuids userGuids)
        {
            var userGuid = await _db.UserGuid
             .Where(u => !u.IsDeleted
                     && u.UserGuidType == userGuids
                     && u.Guid == guid
                     && u.UserId == userId)
             .FirstOrDefaultAsync();

            return userGuid;
        }

        public async Task AddGuid(string guid, int userId, UserGuids userGuids)
        {

            var userGuid = await _db.UserGuid
                .Where(u => !u.IsDeleted
                        && u.UserGuidType == userGuids
                        && u.UserId == userId)
                .FirstOrDefaultAsync();

            if (userGuid != null)
            {
                userGuid.IsDeleted = true;
                await _db.SaveChangesAsync();
            }

            var newUserGuid = new UserGuid()
            {
                UserId = userId,
                UserGuidType = userGuids,
                Guid = guid,
                Expires = DateTime.Now.AddMinutes(3000),
            };
            _db.UserGuid.Add(newUserGuid);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteGuid(string guid, int userId, UserGuids userGuids)
        {
            var userGuid = await _db.UserGuid
            .Where(u => u.Guid == guid
            && u.UserGuidType == userGuids
            && u.UserId == userId)
            .FirstOrDefaultAsync();

            if (userGuid != null)
            {
                userGuid.IsDeleted = true;
                await _db.SaveChangesAsync();
            }
        }

    }
}
