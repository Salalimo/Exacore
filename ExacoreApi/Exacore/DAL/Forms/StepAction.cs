namespace Exacore.DAL.Forms
{
    public class StepAction : BaseEntity, IAuditable
    {
        public int StepActionId { get; set; }
        public string StepSequnce { get; set; }
        public string Hazards { get; set; }
        public string Actions { get; set; }
    }
}
