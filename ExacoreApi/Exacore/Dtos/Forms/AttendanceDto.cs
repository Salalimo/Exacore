namespace Exacore.Dtos.Forms
{
    public class AttendanceDto : BaseDto
    {
        public int AttendanceId { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public string Comments { get; set; }
    }
}
