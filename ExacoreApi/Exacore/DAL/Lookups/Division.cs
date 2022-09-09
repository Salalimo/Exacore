namespace Exacore.DAL.Lookups
{
    public class Division : BaseEntity, IAuditable
    {
        public int DivisionId { get; set; }
        public string Name { get; set; }
        public override string ToString()
        {
            return Name;
        }
    }
}
