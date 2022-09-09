using System;

namespace Exacore.DAL
{
    public interface IAuditable
    {
        int UserId { get; set; }
        DateTime ChangedDate { get; set; }
        bool IsDeleted { get; set; }
    }
}
