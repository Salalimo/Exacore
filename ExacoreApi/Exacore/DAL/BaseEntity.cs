
using Exacore.DAL.Entities.Account;
using System;

namespace Exacore.DAL
{
    public class BaseEntity
    {
        public User ChangedBy { get; set; }
        public int ChangedById { get; set; }

        public DateTime ChangedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
