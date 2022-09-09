using System;

namespace Exacore.Dtos
{
    public class BaseDto
    {
        public int ChangedBy { get; set; }
        public DateTime ChangedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
