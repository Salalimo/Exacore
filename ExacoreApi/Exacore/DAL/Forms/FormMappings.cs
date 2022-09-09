namespace Exacore.DAL.Forms
{
    public class FormMappings : BaseEntity, IAuditable
    {
        public int FormMappingsId { get; set; }
        public FormType FormType { get; set; } 
        public Form Form { get; set; }
    }
}
