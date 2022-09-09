namespace Exacore.DAL.Lookups
{
    public class Project : BaseEntity, IAuditable
    {
        public int ProjectId { get; set; }
        public string Name { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
}
