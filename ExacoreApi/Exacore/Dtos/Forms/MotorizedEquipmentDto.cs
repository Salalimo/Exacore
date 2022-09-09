using System;

namespace Exacore.Dtos.Forms
{
    public class MotorizedEquipmentDto : BaseDto
    {
        public int MotorizedEquipmentId { get; set; }
        public string Model { get; set; }
        public string HourMeter { get; set; }
        public string InspectedBy { get; set; }
        public DateTime Date { get; set; }

        public MotorizedEquipmentOperationalInspectionDto OperationalInspection { get; set; }
        public MotorizedEquipmentDamageInspectionDto DamageInspection { get; set; }
    }
}
