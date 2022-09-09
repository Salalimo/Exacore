using System;

namespace Exacore.DAL
{
    public class BaseEntity
    {
        public int ChangedBy { get; set; }
        public DateTime ChangedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
