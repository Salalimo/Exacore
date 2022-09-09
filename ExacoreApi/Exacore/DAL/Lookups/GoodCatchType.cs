namespace Exacore.DAL.Lookups
{
    public class GoodCatchType : BaseEntity, IAuditable
    {
        public int GoodCatchTypeId { get; set; }
        public string CatchType { get; set; }
        public override string ToString()
        {
            return CatchType;
        }
    }
}
