using System.Collections.Generic;

namespace Exacore.DAL.Forms
{
    public class Form : BaseEntity
    {
        public int FormId { get; set; }
        public string FormName { get; set; }
        public List<GoodCatch> GoodCatches { get; set; }
        public List<Jsa> Jsas { get; set; }
        public List<SiteSafetyOrientation> SiteSafetyOrientations { get; set; }
        public List<IncidentAlert> IncidentAlerts { get; set; }
        public List<MotorizedEquipment> MotorizedEquipments { get; set; }
        public List<NearMiss> NearMisses { get; set; }
        public List<ToolboxMeeting> ToolboxMeetings { get; set; }
    }
}
