namespace Exacore.DAL.Forms
{
    public class MotorizedEquipmentDamageInspection
    {
        public int MotorizedEquipmentDamageInspectionId { get; set; }
        public Operational LeaksDetected { get; set; }
        public Operational TiresAndWheels { get; set; }
        public Operational Forks { get; set; }
        public Operational Attachments { get; set; }
        public Operational BatteryConnectors { get; set; }
        public Operational Guards { get; set; }
        public Operational SafetyDevices { get; set; }
        public Operational PropaneTankLines { get; set; }


    }
}
