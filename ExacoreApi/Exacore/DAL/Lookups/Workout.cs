using System;

namespace Exacore.DAL.Lookups
{
    public class Workout : BaseEntity, IAuditable
    {
        public int? WorkoutId { get; set; }
        public string Exercise { get; set; }
        public int Increments { get; set; }
        public string Units { get; set; }
        public int Points { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        
    }
}
