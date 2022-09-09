using System;
using System.Collections.Generic;

namespace Exacore.DAL.Forms
{
    public class MotorizedEquipment : BaseEntity
    {
        public int MotorizedEquipmentId { get; set; }
        public string Model { get; set; }
        public string HourMeter { get; set; }
        public string InspectedBy { get; set; }
        public DateTime Date { get; set; }

        public MotorizedEquipmentOperationalInspection OperationalInspection { get; set; }
        public MotorizedEquipmentDamageInspection DamageInspection { get; set; }
    }
}
