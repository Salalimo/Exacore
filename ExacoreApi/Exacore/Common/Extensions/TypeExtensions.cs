using System;

namespace Exacore.Common.Extensions
{
    public static class TypeExtensions
    {
        public static int ToInt32(this object value)
        {
            return Int32.Parse(value.ToString());
        }

        //public static int GetAssociationId(this int value, IExacoreContext db)
        //{
        //    return db.AssociationUser
        //        .Where(b => b.UserId == value)
        //        .First()
        //        .AssociationId;
        //}
    }
}
