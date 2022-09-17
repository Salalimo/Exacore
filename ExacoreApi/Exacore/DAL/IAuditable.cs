using System;

namespace Exacore.DAL
{
    public interface IAuditable
    {
        int ChangedById{ get; set; }
        DateTime ChangedDate { get; set; }
        bool IsDeleted { get; set; }
    }
}
