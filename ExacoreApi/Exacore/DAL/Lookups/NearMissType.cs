namespace Exacore.DAL.Lookups
{
    public class NearMissType : BaseEntity, IAuditable
    {
        public int NearMissTypeId { get; set; }
        public string MissType { get; set; }
        public override string ToString()
        {
            return MissType;
        }
    }
}
