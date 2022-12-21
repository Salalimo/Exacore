using Exacore.Dtos.Lookups;
using System;

namespace Exacore.Dtos.Forms
{
    public class MyWorkoutDto : BaseDto
    {
        public int? MyWorkoutId { get; set; }
        public WorkoutDto Workout { get; set; }
        public int? WorkoutId { get; set; }
        public int Quantity { get; set; }
        public DateTime Date{ get; set; }
    }
}
