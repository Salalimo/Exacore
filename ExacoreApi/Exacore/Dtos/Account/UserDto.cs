namespace Exacore.Dtos.Account
{
    public class UserDto : BaseDto
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public virtual RoleDto Role { get; set; }
        public int RoleId { get; set; }
        public int ContactId { get; set; }
        public ContactDto Contact { get; set; }
        //public string Password { get; set; }
        public bool IsActive { get; set; }
    }
}
