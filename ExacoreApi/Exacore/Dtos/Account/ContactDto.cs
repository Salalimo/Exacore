namespace Exacore.Dtos.Account
{
    public class ContactDto : BaseDto
    {
        public int? ContactId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
    }
}
