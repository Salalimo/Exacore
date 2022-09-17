using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Text;

namespace Exacore.Common
{
    public class Hash
    {
        public static string CreateHash(string Password, string Salt)
        {
            var valueBytes = KeyDerivation.Pbkdf2(
                         password: Password,
                         salt: Encoding.UTF8.GetBytes(Salt),
                         prf: KeyDerivationPrf.HMACSHA512,
                         iterationCount: 10000,
                         numBytesRequested: 256 / 8);
            var ret = Convert.ToBase64String(valueBytes);
            return ret;
        }

        public static bool VerifyHash(string Password, string Salt, string HashedPassword)
        {
            return CreateHash(Password, Salt) == HashedPassword;
        }
    }
}