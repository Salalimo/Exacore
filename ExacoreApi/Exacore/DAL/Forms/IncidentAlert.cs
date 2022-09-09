using Exacore.DAL.Lookups;
using System;

namespace Exacore.DAL.Forms
{
    public class IncidentAlert : BaseEntity, IAuditable
    {
        public int IncidentAlertId { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string EquipmentIncidentLocation { get; set; }
        public string Supervisor { get; set; }
        public string InvolvedJobTitle { get; set; }
        public string IncidentDescription { get; set; }
        public string ImmediateActionTaken { get; set; }

        public int AlertTimeId { get; set; }
        public AlertTime AlertTime { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
