namespace Exacore.DAL.Forms
{
    public class UnsafeAct : BaseEntity, IAuditable
    {
        public int UnsafeActId { get; set; }
        public string Description { get; set; }
    }
}
