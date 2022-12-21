using System;

namespace Exacore.Dtos.Forms
{
    public class MyWorkoutListDto
    {
        public int MyWorkoutId { get; set; }
        public string Workout { get; set; }
        public int Quantity { get; set; }
        public DateTime Date { get; set; }
        public int Points { get; set; }
    }
}
