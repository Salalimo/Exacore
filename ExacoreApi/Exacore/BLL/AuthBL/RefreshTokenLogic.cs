using AutoMapper;
using Exacore.BLL.AuthBL.Interfaces;
using Exacore.DAL;
using Exacore.DAL.Entities.Account;
using Exacore.Dtos.Account;
using Exacore.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Exacore.BLL.AuthBL
{
    public class RefreshTokenLogic : IRefreshTokenLogic
    {

        IMapper _mapper;
        IExacoreContext _db;
        readonly AppSettings _appSettings;
        public RefreshTokenLogic(IOptions<AppSettings> appSettings, IExacoreContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        public async Task<bool> AddRefreshToken(AccessTokenDto accessTokenDto, string userName)
        {
            var existingToken = _db.RefreshToken.Where(r => r.UserName == userName).FirstOrDefault();

            if (existingToken != null)
            {
                var result = await DeleteRefreshToken(existingToken);
            }

            var token = new RefreshToken()
            {
                UserName = userName,
                ExpiresUtc = DateTime.Now,
                IssuedUtc = DateTime.Now,
                ProtectedTicket = accessTokenDto.Token,
                RefreshTokenId = accessTokenDto.RefreshTokenId,
                
            };
            _db.RefreshToken.Add(token);
            return await _db.SaveChangesAsync() > 0;
        }
        public async Task<bool> DeleteRefreshToken(string refreshTokenId)
        {
            var refreshToken = await _db.RefreshToken.FindAsync(refreshTokenId);
            if (refreshToken != null)
            {
                _db.RefreshToken.Remove(refreshToken);
                return await _db.SaveChangesAsync() > 0;
            }
            return false;
        }

        private async Task<bool> DeleteRefreshToken(RefreshToken refreshToken)
        {
            _db.RefreshToken.Remove(refreshToken);
            return await _db.SaveChangesAsync() > 0;
        }
        public async Task<RefreshTokenDto> GetRefreshToken(string refreshTokenId)
        {
            var refreshToken = await _db.RefreshToken.FindAsync(refreshTokenId);
            return _mapper.Map<RefreshToken, RefreshTokenDto>(refreshToken);
        }

        public List<RefreshTokenDto> GetAllRefreshTosken()
        {
            var tokens = _db.RefreshToken.ToList();
            return _mapper.Map<List<RefreshToken>, List<RefreshTokenDto>>(tokens);
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes(_appSettings.JwtSecret);
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateAudience = false,
                ValidateIssuer = false,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = true
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }

    }
}
