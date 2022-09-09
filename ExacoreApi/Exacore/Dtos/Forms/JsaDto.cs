using System;
using System.Collections.Generic;

namespace Exacore.Dtos.Forms
{
    public class JsaDto : BaseDto
    {
        public int JsaId { get; set; }
        public string JsaNo { get; set; }
        public string Rev { get; set; }
        public string Reference { get; set; }
        public string JobDescription { get; set; }
        public string Page { get; set; }
        public DateTime Date { get; set; }

        public string Title { get; set; }
        public string Supervisor { get; set; }
        public string AnalysisBy { get; set; }
        public string ApprovedBy { get; set; }
        public string Location { get; set; }
        public string Department { get; set; }
        public bool DailySafety { get; set; }

        public List<StepActionDto> StepActions { get; set; }
        public List<CrewAttendanceDto> CrewAttendances { get; set; }
    }
}
