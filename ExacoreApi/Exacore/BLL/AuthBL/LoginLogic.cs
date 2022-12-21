using AutoMapper;
using Exacore.BLL.AuthBL.Interfaces;
using Exacore.Common;
using Exacore.DAL;
using Exacore.DAL.Entities.Account;
using Exacore.Dtos.Account;
using Exacore.Exceptions;
using Exacore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Exacore.BLL.AuthBL
{
    public class LoginLogic : ILoginLogic
    {
        IExacoreContext _db;
        IRefreshTokenLogic _refreshTokenLogic;
        readonly AppSettings _appSettings;
        public LoginLogic(IOptions<AppSettings> appSettings, IExacoreContext db, IMapper mapper,
            IAccountLogic accountLogic, IRefreshTokenLogic refreshTokenLogic)
        {
            _db = db;
            _appSettings = appSettings.Value;
            _refreshTokenLogic = refreshTokenLogic;
        }

        public async Task<AccessTokenDto> Login(LoginDto dto)
        {
            var user = await _db.User
                .Include(u => u.Role)
                .Where(x => x.Email == dto.Email)
                .FirstOrDefaultAsync();
            var users = await _db.User.ToListAsync();

            if (user == null)
                throw new ApiException("Invalid Credentials");

            bool isValidPass = Hash.VerifyHash(dto.Password, _appSettings.Salt, user.Password);
            if (!isValidPass)
                throw new ApiException("Invalid Credentials");

            if (!user.IsActive)
                throw new ApiException("Inactive User");

            // Load the related Role
            _db.Entry(user).Reference(u => u.Role).Load();

            
            return await GenerateToken(user);
        }

        public async Task<AccessTokenDto> GenerateToken(string email)
        {
            var user = await _db.User
              .Include(u => u.Role)
              .Where(x => x.Email == email)
              .FirstOrDefaultAsync();

            if (user == null)
                return null;
            return await GenerateToken(user);
        }

        public async Task<AccessTokenDto> GenerateToken(User user)
        {
            string refreshTokenId = GenerateRefreshTokenId();
            var accessTokenDto = GenerateToken(user, refreshTokenId);
            await _refreshTokenLogic.DeleteRefreshToken(user.Email);
            await _refreshTokenLogic.AddRefreshToken(accessTokenDto, user.Email);
            return accessTokenDto;
        }


        private AccessTokenDto GenerateToken(User user, string refreshTokenId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_appSettings.JwtSecret);
            int id = 0;

            var subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Role.Name),
                new Claim("UserId", user.UserId.ToString()),
                new Claim("AssociationId", id.ToString())
            });

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = subject,
                IssuedAt = DateTime.Now,
                Expires = DateTime.UtcNow.AddMinutes(250),
                Issuer = _appSettings.Issuer,
                SigningCredentials = new SigningCredentials
                        (new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                
            };

            string token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            AccessTokenDto userDto = new AccessTokenDto
            {
                Email = user.Email,
                Token = token,
                Role = user.Role.Name,
                RefreshTokenId = refreshTokenId,
                Expires = tokenDescriptor.Expires.Value,
                Issued = tokenDescriptor.IssuedAt.Value,
            };
            return userDto;
        }

        public async Task<AccessTokenDto> GetRefreshToken(string token, string refreshTokenId)
        {
            var principal = _refreshTokenLogic.GetPrincipalFromExpiredToken(token);
            var email = principal.Identity.Name;
            var user = _db.User.Include(x => x.Role).SingleOrDefault(x => x.Email == email);

            var savedRefreshToken = await _refreshTokenLogic.GetRefreshToken(email);

            if (savedRefreshToken.RefreshTokenId != refreshTokenId)
            {
                throw new SecurityTokenException("Invalid refresh token");
            }

            var newRefreshTokenId = GenerateRefreshTokenId();
            var accessToken = GenerateToken(user, newRefreshTokenId);
            await _refreshTokenLogic.DeleteRefreshToken(email);
            await _refreshTokenLogic.AddRefreshToken(accessToken, email);
            return accessToken;
        }

        public string GenerateRefreshTokenId()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}
