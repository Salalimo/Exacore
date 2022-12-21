using Exacore.DAL.Lookups;
using System;

namespace Exacore.DAL.Forms
{
    public class MyWorkout : BaseEntity, IAuditable
    {
        public int? MyWorkoutId { get; set; }
        public Workout Workout { get; set; }
        public int? WorkoutId { get; set; }
        public int Quantity { get; set; }
        public DateTime Date { get; set; }
    }
}
