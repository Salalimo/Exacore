using Exacore.DAL.Lookups;
using System;

namespace Exacore.DAL.Forms
{
    public class GoodCatch : BaseEntity, IAuditable
    {
        public int GoodCatchId { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string AffectedJobsiteLocation { get; set; }
        public string Supervisor { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImmediateActionTaken { get; set; }

        public int DivisionId { get; set; }
        public Division Division { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public int GoodCatchTypeId { get; set; }
        public GoodCatchType GoodCatchType { get; set; }
        public int ControlMethodId { get; set; }
        public ControlMethod ControlMethod { get; set; }
    }
}
