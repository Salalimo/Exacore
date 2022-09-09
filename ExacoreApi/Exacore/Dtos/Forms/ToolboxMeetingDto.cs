using Exacore.Dtos.Lookups;
using System;
using System.Collections.Generic;

namespace Exacore.Dtos.Forms
{
    public class ToolboxMeetingDto : BaseDto
    {
        public int ToolboxMeetingId { get; set; }
        public string Supervisor { get; set; }
        public DateTime Date { get; set; }
        public string JobTitle { get; set; }
        public string EmployeeId { get; set; }
        public string Location { get; set; }
        public string ProjectNo { get; set; }
        public int NumberOfAttendees { get; set; }
        public string CrewNo { get; set; }
        public List<TopicDto> Topics { get; set; }
        public List<AttendanceDto> Attendances { get; set; }

        public int ProjectId { get; set; }
        public ProjectDto Project { get; set; }
    }
}
