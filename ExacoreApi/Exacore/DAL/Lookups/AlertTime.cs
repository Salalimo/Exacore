namespace Exacore.DAL.Lookups
{
    public class AlertTime : BaseEntity, IAuditable
    {
        public int AlertTimeId { get; set; }
        public string Name { get; set; }
        public override string ToString()
        {
            return Name;
        }
    }
}
