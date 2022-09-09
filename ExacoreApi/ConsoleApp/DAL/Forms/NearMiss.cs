using Exacore.DAL.Lookups;
using System;
using System.Collections.Generic;

namespace Exacore.DAL.Forms
{
    public class NearMiss : BaseEntity
    {
        public int NearMissId { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string AffectedJobsiteLocation { get; set; }
        public string Supervisor { get; set; }
        public string ReporingPerson { get; set; }
        public string NearMissDescription { get; set; }
        public string ImmediateAction { get; set; }
        public string CorrectiveAction { get; set; }
        public string Ssho { get; set; }
        public string Manager { get; set; }
        public List<UnsafeAct> UnsafeActs { get; set; }

        public int DivisionId { get; set; }
        public Division Division { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public int NearMissTypeId { get; set; }
        public NearMissType NearMissType { get; set; }
        public int ControlMethodId { get; set; }
        public ControlMethod ControlMethod { get; set; }

        public bool WrongselectionofPPE { get; set; }
        public bool DisregardSafetyRules { get; set; }
        public bool Employeefatigue { get; set; }
        public bool Failuretofollowprocedure { get; set; }
        public bool Takingshortcuts { get; set; }
        public bool Lackofattention { get; set; }
        public bool Workingtofast { get; set; }
        public bool Lackofemployeetraining { get; set; }
        public bool ImproperLiftingtechnique { get; set; }
        public bool Newtaskforemployeeorlackofexperience { get; set; }
        public bool Failuretosecureorwarn { get; set; }
        public bool Nooroutdatedprocedure { get; set; }
        public bool Operatingwithoutauthority { get; set; }
        public bool Hazardousmethodorprocedure { get; set; }
        public bool Poorpositioning { get; set; }
        public bool Unsafeposture { get; set; }
        public bool Travelingpublicenteringworkarea { get; set; }
        public bool IncompleteoroutdatedJSA { get; set; }
        public bool ImproperLOTO { get; set; }
        public bool Poororhousekeepingpractices { get; set; }
        public bool Guardremovedornotinstalledonequipment { get; set; }
        public bool Equipmentfailure { get; set; }
        public bool Impropermaterialorequipmentused { get; set; }
        public bool Weather { get; set; }
        public bool Other { get; set; }
    }
}
