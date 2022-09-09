namespace Exacore.Dtos.Forms
{
    public class MotorizedEquipmentOperationalInspectionDto
    {
        public int MotorizedEquipmentOperationalInspectionId { get; set; }
        public OperationalDto Headlights { get; set; }
        public OperationalDto ReverseLights { get; set; }
        public OperationalDto RunningLights { get; set; }
        public OperationalDto ParkingBrake { get; set; }
        public OperationalDto BatteryGauge { get; set; }
        public OperationalDto WaterLevelGauge { get; set; }
        public OperationalDto TemperatureGauge { get; set; }
        public OperationalDto OilLevelGauge { get; set; }
        public OperationalDto FuelLevelGauge { get; set; }
        public OperationalDto Horn { get; set; }
        public OperationalDto ReverseSignal { get; set; }
        public OperationalDto Brakes { get; set; }
        public OperationalDto SeatBelt { get; set; }
        public OperationalDto Chains { get; set; }
        public OperationalDto HydraulicOutriggers { get; set; }
        public OperationalDto HydraulicTilt { get; set; }
        public OperationalDto HydraulicSideShift { get; set; }
        public OperationalDto EngineOilLevel { get; set; }
        public OperationalDto HydraulicOilLevel { get; set; }
        public OperationalDto SteeringControls { get; set; }
    }
}
