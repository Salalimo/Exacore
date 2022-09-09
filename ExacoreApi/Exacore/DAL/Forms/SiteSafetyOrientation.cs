using Exacore.DAL.Lookups;
using System;

namespace Exacore.DAL.Forms
{
    public class SiteSafetyOrientation : BaseEntity, IAuditable
    {
        public int SiteSafetyOrientationId { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public bool GeneralHealth { get; set; }
        public bool HouseKeeping { get; set; }
        public bool PowerTools { get; set; }
        public bool FirePrevention { get; set; }
        public bool Welding { get; set; }
        public bool CompressedAir { get; set; }
        public bool ElectricalSafety { get; set; }
        public bool AerialLifts { get; set; }
        public bool Scaffolding { get; set; }
        public bool Trenching { get; set; }
        public bool FallProtection { get; set; }
        public bool FleetSafety { get; set; }
        public bool CraneSafety { get; set; }
        public bool FirstAid { get; set; }
        public bool Pathogens { get; set; }
        public bool Lead { get; set; }
        public bool ConfinedSpaces { get; set; }
        public bool Lockout { get; set; }
        public bool ForkTrucks { get; set; }
        public bool ProtectiveEquipment { get; set; }
        public bool HearingProtection { get; set; }
        public bool DesignateFacilities { get; set; }
        public bool Coverage { get; set; }
        public bool ContactInformation { get; set; }
        public bool WhatRequires { get; set; }
        public bool WhenToReport { get; set; }
        public bool WhoToNotify { get; set; }
        public bool TestingProcedures { get; set; }
        public bool ReportingOfMedication { get; set; }
        public bool Eap { get; set; }
        public bool ProgressivePolicy { get; set; }
        public bool ObtainInformation { get; set; }
        public bool Sds { get; set; }
        public bool HazardCommunication { get; set; }
        public bool LabelingSystems { get; set; }
        public bool ProtectiveMeasures { get; set; }
        public bool AlarmSystems { get; set; }
        public bool ShelterAreas { get; set; }
        public bool MusteringZones { get; set; }
        public bool AccountingProcedures { get; set; }
        public bool HardHats { get; set; }
        public bool SafetyVests { get; set; }
        public bool HandProtection { get; set; }
        public bool FootProtection { get; set; }
        public bool FaceProtection { get; set; }
        public bool HearingProtection2 { get; set; }
        public bool ProtectiveClothing { get; set; }
        public bool PersonalFallArrest { get; set; }
        public bool StepLadders { get; set; }
        public bool ExtensionLadders { get; set; }
        public bool Capacities { get; set; }
        public bool ProperUse { get; set; }
    }
}