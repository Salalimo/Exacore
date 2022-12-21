using AutoMapper;
using Exacore.DAL;
using Exacore.DAL.Entities.Account;
using Exacore.DAL.Forms;
using Exacore.DAL.Lookups;
using Exacore.Dtos;
using Exacore.Dtos.Account;
using Exacore.Dtos.Forms;
using Exacore.Dtos.Lookups;

namespace Exacore
{
    public class AutoMapperSetup
    {
        public static MapperConfiguration Configure()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Contact, ContactDto>().ReverseMap();
                cfg.CreateMap<RefreshToken, RefreshTokenDto>().ReverseMap();
                cfg.CreateMap<Role, RoleDto>().ReverseMap();
                cfg.CreateMap<User, UserDto>().ReverseMap();
                cfg.CreateMap<UserGuid, UserGuidDto>().ReverseMap();
                cfg.CreateMap<BaseEntity, BaseDto>().ReverseMap();

                cfg.CreateMap<AlertTime, AlertTimeDto>().ReverseMap();
                cfg.CreateMap<ControlMethod, ControlMethodDto>().ReverseMap();
                cfg.CreateMap<Department, DepartmentDto>().ReverseMap();
                cfg.CreateMap<Division, DivisionDto>().ReverseMap();
                cfg.CreateMap<GoodCatchType, GoodCatchTypeDto>().ReverseMap();
                cfg.CreateMap<NearMissType, NearMissTypeDto>().ReverseMap();
                cfg.CreateMap<Project, ProjectDto>().ReverseMap();
                cfg.CreateMap<Workout, WorkoutDto>().ReverseMap();
                
                //forms
                cfg.CreateMap<GoodCatch, GoodCatchDto>().ReverseMap();
                cfg.CreateMap<IncidentAlert, IncidentAlertDto>().ReverseMap();
                cfg.CreateMap<Jsa, JsaDto>().ReverseMap();
                cfg.CreateMap<MotorizedEquipment, MotorizedEquipmentDto>().ReverseMap();
                cfg.CreateMap<MotorizedEquipmentDamageInspection, MotorizedEquipmentDamageInspectionDto>().ReverseMap();
                cfg.CreateMap<MotorizedEquipmentOperationalInspection, MotorizedEquipmentOperationalInspectionDto>().ReverseMap();
                cfg.CreateMap<Operational, OperationalDto>().ReverseMap();
                cfg.CreateMap<NearMiss, NearMissDto>().ReverseMap();
                cfg.CreateMap<SiteSafetyOrientation, SiteSafetyOrientationDto>().ReverseMap();
                cfg.CreateMap<ToolboxMeeting, ToolboxMeetingDto>().ReverseMap();
                cfg.CreateMap<Form, FormDto>().ReverseMap();
                cfg.CreateMap<MyWorkout, MyWorkoutDto>().ReverseMap();
                //formsplus
                cfg.CreateMap<Attendance, AttendanceDto>().ReverseMap();
                cfg.CreateMap<CrewAttendance, CrewAttendanceDto>().ReverseMap();
                cfg.CreateMap<Operational, OperationalDto>().ReverseMap();
                cfg.CreateMap<StepAction, StepActionDto>().ReverseMap();
                cfg.CreateMap<Topic, TopicDto>().ReverseMap();
                cfg.CreateMap<UnsafeAct, UnsafeActDto>().ReverseMap();

                //addmore

            });
            return config;
        }
    }
}
