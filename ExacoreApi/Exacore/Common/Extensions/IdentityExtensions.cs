using System.Security.Claims;
using System.Security.Principal;

namespace Exacore.Common.Extensions
{
    public static class IdentityExtensions
    {
        public static int GetUserId(this IIdentity claimsIdentity)
        {
            var identity = claimsIdentity as ClaimsIdentity;
            string value = identity.FindFirst("UserId")?.Value;
            if (string.IsNullOrEmpty(value))
                return 0;

            return identity.FindFirst("UserId").Value.ToInt32();
        }

        //public static string GetRole(this IIdentity claimsIdentity)
        //{
        //    var claims = claimsIdentity as ClaimsIdentity;
        //    return claims.FindFirst("Role").Value;
        //}
    }
}
