namespace Exacore.DAL.Forms
{
    public class FormType : BaseEntity, IAuditable
    {
        public int FormTypeId { get; set; }
        public string Name { get; set; }
    }
}
