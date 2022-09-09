namespace Exacore.DAL.Lookups
{
    public class Department : BaseEntity, IAuditable
    {
        public int DepartmentId { get; set; }
        public string Name { get; set; }
        public override string ToString()
        {
            return Name;
        }
    }
}
