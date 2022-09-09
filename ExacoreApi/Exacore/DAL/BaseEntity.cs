using Exacore.DAL.Entities.Account;
using System;

namespace Exacore.DAL
{
    public class BaseEntity
    {
        public User User { get; set; }
        public int UserId { get; set; }

        public DateTime ChangedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
