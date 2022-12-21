using Exacore.DAL.Entities.Account;
using Exacore.DAL.Forms;
using Exacore.DAL.Lookups;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;

namespace Exacore.DAL
{
    public interface IExacoreContext
    {
        //DatabaseFacade Database { get; }
        EntityEntry<TEntity> Entry<TEntity>([NotNullAttribute] TEntity entity) where TEntity : class;

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        int SaveChanges();

        DbSet<Contact> Contact { get; set; }
        DbSet<RefreshToken> RefreshToken { get; set; }
        DbSet<Role> Roles { get; set; }
        DbSet<User> User { get; set; }
        DbSet<UserGuid> UserGuid { get; set; }
        //lookups
        DbSet<AlertTime> AlertTime { get; set; }
        DbSet<ControlMethod> ControlMethod { get; set; }
        DbSet<Department> Department { get; set; }
        DbSet<Division> Division { get; set; }
        DbSet<GoodCatchType> GoodCatchType { get; set; }
        DbSet<NearMissType> NearMissType { get; set; }
        DbSet<Project> Project { get; set; }
        DbSet<Workout> Workout { get; set; }

        //forms
        DbSet<Attendance> Attendance { get; set; }
        DbSet<CrewAttendance> CrewAttendance { get; set; }
        DbSet<Form> Form { get; set; }
        DbSet<FormType> FormType { get; set; }
        DbSet<FormMappings> FormMappings { get; set; }
        DbSet<GoodCatch> GoodCatch { get; set; }
        DbSet<IncidentAlert> IncidentAlert { get; set; }
        DbSet<Jsa> Jsa { get; set; }
        DbSet<MotorizedEquipment> MotorizedEquipment { get; set; }
        DbSet<NearMiss> NearMiss { get; set; }
        DbSet<Operational> Operational { get; set; }
        DbSet<SiteSafetyOrientation> SiteSafetyOrientation { get; set; }
        DbSet<StepAction> StepAction { get; set; }
        DbSet<ToolboxMeeting> ToolboxMeeting { get; set; }
        DbSet<MyWorkout> MyWorkout { get; set; }


        //addmore





    }
}
