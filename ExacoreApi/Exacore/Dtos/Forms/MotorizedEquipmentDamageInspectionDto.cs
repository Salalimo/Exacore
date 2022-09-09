namespace Exacore.Dtos.Forms
{
    public class MotorizedEquipmentDamageInspectionDto
    {
        public int MotorizedEquipmentDamageInspectionId { get; set; }
        public OperationalDto LeaksDetected { get; set; }
        public OperationalDto TiresAndWheels { get; set; }
        public OperationalDto Forks { get; set; }
        public OperationalDto Attachments { get; set; }
        public OperationalDto BatteryConnectors { get; set; }
        public OperationalDto Guards { get; set; }
        public OperationalDto SafetyDevices { get; set; }
        public OperationalDto PropaneTankLines { get; set; }
    }
}
