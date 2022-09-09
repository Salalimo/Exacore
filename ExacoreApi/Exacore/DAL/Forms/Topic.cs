namespace Exacore.DAL.Forms
{
    public class Topic : BaseEntity, IAuditable
    {
        public int TopicId { get; set; }  
        public string Description { get; set; }
    }
}
