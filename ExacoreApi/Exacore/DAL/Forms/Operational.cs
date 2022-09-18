namespace Exacore.DAL.Forms
{
    public class Operational : BaseEntity, IAuditable
    {
        public int OperationalId { get; set; }
        public string Name { get; set; }
        public string YesNoNa { get; set; }
        public string Description { get; set; }

        public override string ToString()
        {
            return Description;
        }
    }
}
