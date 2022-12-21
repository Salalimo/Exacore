using AutoMapper;
using Exacore.BLL.FormsBL.Interfaces;
using Exacore.DAL;
using Exacore.DAL.Forms;
using Exacore.Dtos.Forms;
using Exacore.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Exacore.BLL.LookupsBL
{
    public class MyWorkoutLogic : IMyWorkoutLogic
    {
        IMapper _mapper;
        IExacoreContext _db;

        public MyWorkoutLogic(IMapper mapper, IExacoreContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<List<WorkoutLeadersDto>> GetWorkoutLeaders()
        {
            var leaders = await _db.MyWorkout
                .Join(_db.Workout,
                m => m.WorkoutId,
                w => w.WorkoutId,
                (m, w) => new
                {
                    Points = w.Points * m.Quantity,
                    UserId = m.ChangedById
                })
                .Join(_db.User.Include(u => u.Contact),
                j => j.UserId,
                u => u.UserId,
                (j, u) => new
                {
                    Points = j.Points,
                    Name = u.Contact.FirstName + " " + u.Contact.LastName,
                })
                .GroupBy(m => m.Name)
                .Select(m => new WorkoutLeadersDto
                {
                    Name = m.Key,
                    Points = m.Sum(v => v.Points)
                })
                .OrderByDescending(m => m.Points)
                .ToListAsync();

            return leaders;
        }

        public async Task<List<MyWorkoutListDto>> GetAll(int userId)
        {
            await GetWorkoutLeaders();
            var query = _db.MyWorkout
                .Include(m => m.Workout)
                .Where(t => !t.IsDeleted && t.ChangedById == userId);

            var workouts = await query
                .Select(t => new MyWorkoutListDto()
                {
                    MyWorkoutId = t.MyWorkoutId.Value,
                    Quantity = t.Quantity * t.Workout.Increments,
                    Workout = t.Workout.Exercise, //+ " " + t.Units + " " + t.Workout.Units
                    Date = t.Date,
                    Points = t.Quantity * t.Workout.Points
                })
                .OrderBy(t => t.Date)
                .ToListAsync();
            return workouts;
        }

        public async Task<MyWorkoutDto> Get(int Id)
        {
            var workout = await _db.MyWorkout.Where(t => t.WorkoutId == Id).FirstAsync();
            return _mapper.Map<MyWorkout, MyWorkoutDto>(workout);
        }

        public async Task<MyWorkoutDto> Add(MyWorkoutDto dto, int userId)
        {
            var workout = _mapper.Map<MyWorkoutDto, MyWorkout>(dto);
            workout.Workout = null;

            if (workout.Quantity == 0)
                workout.Quantity = 1;

            var workouts = await _db.MyWorkout
                .Include(w => w.Workout)
                .Where(w => w.ChangedById == userId && w.Date == dto.Date.Date)
                .ToListAsync();

            var minutes = workouts.Sum(w => w.Quantity * w.Workout.Increments);
            var count = workouts.Count;

            var newWorkout = await _db.Workout.FindAsync(workout.WorkoutId);
            if (
                (newWorkout.StartDate != null && newWorkout.StartDate > dto.Date)
                || (newWorkout.EndDate != null && newWorkout.EndDate < dto.Date)
                )
            {
                string message = "";
                if (newWorkout.StartDate.HasValue)
                    message += "The workout is available after " + newWorkout.StartDate.Value.ToShortDateString();

                if (newWorkout.EndDate.HasValue)
                    message += string.IsNullOrEmpty(message)
                        ? "The workout is available before " + newWorkout.EndDate.Value
                        : " and before " + newWorkout.EndDate.Value;

                message = "You cannot add the workout on the specified date. " + message;
                throw new ApiException(message);
            }

            var newMunutes = newWorkout.Increments * dto.Quantity;
            var totalMinutes = minutes + newMunutes;

            if (totalMinutes > 60 && (count > 0 || dto.Quantity > 1))
                throw new ApiException("A maximum of 60 minutes of workout is allowed per day.");

            _db.MyWorkout.Add(workout);
            await _db.SaveChangesAsync();
            return _mapper.Map<MyWorkout, MyWorkoutDto>(workout);
        }

        public async Task<MyWorkoutDto> Update(MyWorkoutDto dto)
        {
            var workout = await _db.MyWorkout.Where(t => t.WorkoutId == dto.WorkoutId).FirstAsync();
            workout.Workout = null;
            _mapper.Map(dto, workout);
            _db.Entry(workout).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return _mapper.Map<MyWorkout, MyWorkoutDto>(workout);
        }

        public async Task Delete(int Id)
        {
            var workout = await _db.MyWorkout.FindAsync(Id);
            _db.MyWorkout.Remove(workout);
            await _db.SaveChangesAsync();
        }
    }
}