import { Component, OnInit } from '@angular/core';
import { MyWorkoutClient, MyWorkoutDto, WorkoutDto, WorkoutClient, MyWorkoutListDto, WorkoutLeadersDto } from '../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
    templateUrl: 'myworkouts.component.html',
})
export class MyWorkoutsComponent implements OnInit {

    errorMessage: string = '';
    myWorkout: MyWorkoutDto = new MyWorkoutDto();
    myWorkouts: MyWorkoutListDto[] = [];
    leaders: WorkoutLeadersDto[] = [];
    workouts: WorkoutDto[] = [];

    showIncrementsDD: boolean = true;
    displayedColumns: string[] = ['workout', 'quantity', 'points', 'date'];
    leadersDisplayedColumns: string[] = ['name', 'points'];

    constructor(
        private myWorkoutClient: MyWorkoutClient,
        private workoutClient: WorkoutClient,
        private httpclient: HttpClient,
    ) {
        this.myWorkout.workout = new WorkoutDto();
        this.myWorkout.workoutId = 0;
    }

    ngOnInit(): void {
        this.getWorkoutLeaders();
        this.getMyWorkouts();
        this.getWorkouts();
    }

    getMyWorkouts() {
        this.myWorkoutClient.getAll().subscribe((data) => {
            this.myWorkouts = data;
        });
    }

    getWorkoutLeaders() {
        this.myWorkoutClient.getWorkoutLeaders().subscribe((data) => {
            this.leaders = data;
        });
    }

    getWorkouts() {
        this.workoutClient.getAll().subscribe((data) => {
            this.workouts = data;
        });
    }

    addWorkout() {


        this.errorMessage = '';
        console.log(this.myWorkout.myWorkoutId);

        if (this.showIncrementsDD && !this.myWorkout.quantity) {
            this.errorMessage = 'Please select work duration.';
            return;
        }
        
        // this.myWorkout.workoutId = this.selectedWorkout.workoutId;
        //console.log(this.selectedWorkout.workoutId)

        this.myWorkout.date = new Date(this.myWorkout.date);
        this.httpclient.post(environment.apiUrl + 'api/MyWorkout', this.myWorkout).subscribe({
            next: (data: any) => {
                this.myWorkout = new MyWorkoutDto();
                this.getMyWorkouts();
                this.getWorkoutLeaders();
            },
            error: (error) => {
                this.myWorkout = new MyWorkoutDto();
                console.log(error)
                if (error != undefined)
                    this.errorMessage = error.error.message;

            }
        }
            //     (data) => {
            //     this.getMyWorkouts();
            // }, (error) => {
            //     console.log(error)
            //     this.errorMessage = error.message;
            // }
        );
    }

    ddChange(val: any) {
        console.log(this.myWorkout.workoutId)
        this.workouts.forEach((w) => {
            if (this.myWorkout.workoutId == w.workoutId) {
                if (w.increments == 0)
                    this.showIncrementsDD = false;
                else
                    this.showIncrementsDD = true;
            }
        });
    }
}