using AutoMapper;
using Exacore.BLL.LookupsBL.Interfaces;
using Exacore.DAL;
using Exacore.DAL.Lookups;
using Exacore.Dtos.Lookups;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL
{
    public class WorkoutLogic : IWorkoutLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public WorkoutLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<List<WorkoutDto>> GetAll()
        {
            var query = _db.Workout
                .Where(t => !t.IsDeleted);
         
            var workouts = await query.ToListAsync();
            return _mapper.Map<List<Workout>, List<WorkoutDto>>(workouts);
        }

        public async Task<WorkoutDto> Get(int Id)
        {
            var workout = await _db.Workout.Where(t => t.WorkoutId == Id).FirstAsync();
            return _mapper.Map<Workout, WorkoutDto>(workout);
        }

        public async Task<WorkoutDto> Add(WorkoutDto dto)
        {
            var workout = _mapper.Map<WorkoutDto, Workout>(dto);
            _db.Workout.Add(workout);
            await _db.SaveChangesAsync();
            return _mapper.Map<Workout, WorkoutDto>(workout);
        }

        public async Task<WorkoutDto> Update(WorkoutDto dto)
        {
            var workout = await _db.Workout.Where(t => t.WorkoutId == dto.WorkoutId).FirstAsync();
            _mapper.Map(dto, workout);
            _db.Entry(workout).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<Workout, WorkoutDto>(workout);
        }

        public async Task Delete(int Id)
        {
            var workout = await _db.Workout.FindAsync(Id);
            _db.Workout.Remove(workout);
            await _db.SaveChangesAsync();
        }
        //add here
    }
}