using Exacore.DAL.Entities.Account;
using Exacore.DAL.Forms;
using Exacore.DAL.Lookups;
using System;
using System.Data.Entity;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Exacore.DAL
{
    public class ExacoreContext : DbContext
    {

        //account
        public virtual DbSet<Contact> Contact { get; set; }
        public virtual DbSet<RefreshToken> RefreshToken { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserGuid> UserGuid { get; set; }

        //lookups
        public virtual DbSet<AlertTime> AlertTime { get; set; }
        public virtual DbSet<ControlMethod> ControlMethod { get; set; }
        public virtual DbSet<Department> Department { get; set; }
        public virtual DbSet<Division> Division { get; set; }
        public virtual DbSet<GoodCatchType> GoodCatchType { get; set; }
        public virtual DbSet<NearMissType> NearMissType { get; set; }
        public virtual DbSet<Project> Project { get; set; }

        //forms
        public virtual DbSet<Attendance> Attendance { get; set; }
        public virtual DbSet<CrewAttendance> CrewAttendance { get; set; }
        public virtual DbSet<Form> Form { get; set; }
        public virtual DbSet<FormType> FormType { get; set; }
        public virtual DbSet<FormMappings> FormMappings { get; set; }
        public virtual DbSet<GoodCatch> GoodCatch { get; set; }
        public virtual DbSet<IncidentAlert> IncidentAlert { get; set; }
        public virtual DbSet<Jsa> Jsa { get; set; }
        public virtual DbSet<MotorizedEquipment> MotorizedEquipment { get; set; }
        public virtual DbSet<NearMiss> NearMiss { get; set; }
        public virtual DbSet<Operational> Operational { get; set; }
        public virtual DbSet<SiteSafetyOrientation> SiteSafetyOrientation { get; set; }
        public virtual DbSet<StepAction> StepAction { get; set; }
        public virtual DbSet<ToolboxMeeting> ToolboxMeeting { get; set; }

        public override int SaveChanges()
        {
            var changeSet = ChangeTracker.Entries<IAuditable>();

            if (changeSet != null)
            {
                foreach (var entry in changeSet.Where(c => c.State != EntityState.Unchanged))
                {
                    entry.Entity.ChangedDate = DateTime.Now;
                    entry.Entity.ChangedBy = 0;// HttpContext.Current.User.Identity.Name;
                }
            }
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var changeSet = ChangeTracker.Entries<IAuditable>();

            if (changeSet != null)
            {
                foreach (var entry in changeSet.Where(c => c.State != EntityState.Unchanged))
                {
                    entry.Entity.ChangedDate = DateTime.Now;
                    entry.Entity.ChangedBy = 0;// HttpContext.Current.User.Identity.Name;
                }
            }

            return await base.SaveChangesAsync();
        }
    }
}