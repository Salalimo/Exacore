namespace Exacore.Dtos.Forms
{
    public class CrewAttendanceDto : BaseDto
    {
        public int CrewAttendanceId { get; set; }
        public string PrintName { get; set; }
        public string SignName { get; set; }
        public string SignIn { get; set; }
        public string SignOut { get; set; }
    }
}
