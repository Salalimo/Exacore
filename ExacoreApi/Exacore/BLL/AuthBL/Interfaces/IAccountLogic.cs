using Exacore.Dtos.Account;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exacore.BLL.AuthBL.Interfaces
{
    public interface IAccountLogic
    {
        Task Register(RegisterDto dto);
        Task ForgotPassword(EmailDto dto);
        Task ResetPassword(ResetPasswordDto dto);
        Task ResendVerification(EmailDto dto);
        Task ActivateAccount(EmailDto dto);

        Task<List<RoleDto>> GetRoles();


    }
}
