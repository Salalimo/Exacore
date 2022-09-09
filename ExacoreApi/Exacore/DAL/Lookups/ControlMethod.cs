namespace Exacore.DAL.Lookups
{
    public class ControlMethod : BaseEntity, IAuditable
    {
        public int ControlMethodId { get; set; }
        public string Method { get; set; }
        public override string ToString()
        {
            return Method;
        }
    }
}
