using Exacore.Common;
using System;


namespace Exacore.Dtos.Account
{
    public class UserGuidDto
    {
        public int UserGuidId { get; set; }
        
        public int UserId { get; set; }
        public UserDto User { get; set; }
        public UserGuids UserGuidType { get; set; }
        public string Guid { get; set; }
        public DateTime Expires{ get; set; }



    }
}
