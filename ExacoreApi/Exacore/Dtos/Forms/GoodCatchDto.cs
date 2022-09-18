using Exacore.Dtos.Lookups;
using System;

namespace Exacore.Dtos.Forms
{
    public class GoodCatchDto : BaseDto
    {
        public int GoodCatchId { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string AffectedJobsiteLocation { get; set; }
        public string Supervisor { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImmediateActionTaken { get; set; }

        public int? DivisionId { get; set; }
        public DivisionDto Division { get; set; }
        public int? DepartmentId { get; set; }
        public DepartmentDto Department { get; set; }
        public int? ProjectId { get; set; }
        public ProjectDto Project { get; set; }
        public int? GoodCatchTypeId { get; set; }
        public GoodCatchTypeDto GoodCatchType { get; set; }
        public int? ControlMethodId { get; set; }
        public ControlMethodDto ControlMethod { get; set; }
    }
}
