using Exacore.DAL.Lookups;
using System;
using System.Collections.Generic;

namespace Exacore.DAL.Forms
{
    public class ToolboxMeeting : BaseEntity, IAuditable
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
        public List<Topic> Topics { get; set; }
        public List<Attendance> Attendances { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
