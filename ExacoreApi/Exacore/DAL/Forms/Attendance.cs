namespace Exacore.DAL.Forms
{
    public class Attendance : BaseEntity, IAuditable
    {
        public int AttendanceId { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public string Comments { get; set; }
    }
}
