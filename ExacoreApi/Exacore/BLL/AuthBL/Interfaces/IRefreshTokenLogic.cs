using Exacore.Dtos.Account;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Exacore.BLL.AuthBL.Interfaces
{
    public interface IRefreshTokenLogic
    {

        Task<bool> AddRefreshToken(AccessTokenDto accessTokenDto, string userName);

        Task<bool> DeleteRefreshToken(string refreshTokenId);
        //Task<bool> RemoveRefreshToken(RefreshTokenDto refreshToken);

        Task<RefreshTokenDto> GetRefreshToken(string refreshTokenId);

        List<RefreshTokenDto> GetAllRefreshTosken();

        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
