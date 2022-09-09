using System.Collections.Generic;

namespace Exacore.Dtos.Forms
{
    public class FormDto : BaseDto
    {
        public int FormId { get; set; }
        public string FormName { get; set; }
        public List<GoodCatchDto> GoodCatches { get; set; }
        public List<JsaDto> Jsas { get; set; }
        public List<SiteSafetyOrientationDto> SiteSafetyOrientations { get; set; }
        public List<IncidentAlertDto> IncidentAlerts { get; set; }
        public List<MotorizedEquipmentDto> MotorizedEquipments { get; set; }
        public List<NearMissDto> NearMisses { get; set; }
        public List<ToolboxMeetingDto> ToolboxMeetings { get; set; }
    }
}
