using Exacore.Dtos.Account;
using System.Threading.Tasks;

namespace Exacore.BLL.AuthBL.Interfaces
{
    public interface ILoginLogic
    {
        Task<AccessTokenDto> Login(LoginDto dto);
        Task<AccessTokenDto> GenerateToken(string email);
        Task<AccessTokenDto> GetRefreshToken(string refreshToken, string refreshTokenId);
    }
}
