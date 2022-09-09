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
            var MotorizedEquipment = await _db.MotorizedEquipment.Where(t => t.MotorizedEquipmentId == Id).FirstAsync();
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
    }
}