using AutoMapper;
using Exacore.BLL.LookupsBL.Interfaces;
using Exacore.DAL;
using Exacore.DAL.Forms;
using Exacore.Dtos.Forms;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL
{
    public class MotorizedEquipmentLogic : IMotorizedEquipmentLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public MotorizedEquipmentLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<MotorizedEquipmentDto> Get(int Id)
        {
            var MotorizedEquipment = await _db.MotorizedEquipment
                .Include(t => t.OperationalInspection.Headlights)
                .Include(t => t.OperationalInspection.ReverseLights)
                .Include(t => t.OperationalInspection.ReverseLights)
                .Include(t => t.OperationalInspection.RunningLights)
                .Include(t => t.OperationalInspection.ParkingBrake)
                .Include(t => t.OperationalInspection.BatteryGauge)
                .Include(t => t.OperationalInspection.WaterLevelGauge)
                .Include(t => t.OperationalInspection.TemperatureGauge)
                .Include(t => t.OperationalInspection.OilLevelGauge)
                .Include(t => t.OperationalInspection.FuelLevelGauge)
                .Include(t => t.OperationalInspection.Horn)
                .Include(t => t.OperationalInspection.ReverseSignal)
                .Include(t => t.OperationalInspection.Brakes)
                .Include(t => t.OperationalInspection.SeatBelt)
                .Include(t => t.OperationalInspection.Chains)
                .Include(t => t.OperationalInspection.HydraulicOutriggers)
                .Include(t => t.OperationalInspection.HydraulicTilt)
                .Include(t => t.OperationalInspection.HydraulicSideShift)
                .Include(t => t.OperationalInspection.EngineOilLevel)
                .Include(t => t.OperationalInspection.HydraulicOilLevel)
                .Include(t => t.OperationalInspection.SteeringControls)
                .Include(t => t.DamageInspection.LeaksDetected)
                .Include(t => t.DamageInspection.TiresAndWheels)
                .Include(t => t.DamageInspection.Forks)
                .Include(t => t.DamageInspection.Attachments)
                .Include(t => t.DamageInspection.BatteryConnectors)
                .Include(t => t.DamageInspection.Guards)
                .Include(t => t.DamageInspection.SafetyDevices)
                .Include(t => t.DamageInspection.PropaneTankLines)
                .Where(t => t.MotorizedEquipmentId == Id)
                .FirstAsync();
            return _mapper.Map<MotorizedEquipment, MotorizedEquipmentDto>(MotorizedEquipment);
        }

        public async Task<MotorizedEquipmentDto> Add(MotorizedEquipmentDto dto)
        {
            var motorizedEquipment = _mapper.Map<MotorizedEquipmentDto, MotorizedEquipment>(dto);
            var form = new Form();
            form.MotorizedEquipments = new List<MotorizedEquipment>();
            form.MotorizedEquipments.Add(motorizedEquipment);
            //var formType = await _db.FormType.Where(t => t.Name == "MotorizedEquipment").FirstAsync();
            form.FormName = "Motorized Equipment";

            _db.Form.Add(form);
            await _db.SaveChangesAsync();
            return _mapper.Map<MotorizedEquipment, MotorizedEquipmentDto>(motorizedEquipment);
        }

        public async Task<MotorizedEquipmentDto> Update(MotorizedEquipmentDto dto)
        {
            var motorizedEquipment = await _db.MotorizedEquipment.FindAsync(dto.MotorizedEquipmentId);
            _mapper.Map(dto, motorizedEquipment);
            _db.Entry(motorizedEquipment).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<MotorizedEquipment, MotorizedEquipmentDto>(motorizedEquipment);
        }
    }
}