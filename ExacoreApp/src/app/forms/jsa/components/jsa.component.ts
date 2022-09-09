import { Component, OnInit, OnDestroy } from '@angular/core';
import { JsaFormDataService } from '../services/jsa.form.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JsaDto, JsaClient , StepActionDto, CrewAttendanceDto } from '../../../services/api.service';

@Component({
    templateUrl: 'jsa.component.html',
    styleUrls: ['../../forms.css']
})
export class JsaComponent implements OnInit, OnDestroy {

    sub: any = {};
    error: string = '';
    jsaForm: FormGroup;
    submitted: boolean = false;
    jsaId: number = 0;
    jsa: JsaDto = new JsaDto();



    constructor(

        private formDataService: JsaFormDataService,
        private jsaClient: JsaClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {


        this.setupForm();
        this.sub = this.route.params.subscribe(params => {
            this.jsaId = +params['jsaId'];
        });
    }

    get f() { return this.jsaForm.controls; }
    get s() { return this.f.stepactions as FormArray; }
    get c() { return this.f.crewattendances as FormArray; }


    setupForm() {
        this.jsaForm = this.formDataService.buildForm();
    }


    saveForm() {
        this.error = '';

        this.jsa = new JsaDto();
        this.jsa.jsaNo = this.f.jsaNo.value;
        this.jsa.rev = this.f.rev.value;
        this.jsa.reference = this.f.reference.value;
        this.jsa.jobDescription = this.f.jobDescription.value;
        this.jsa.page = this.f.page.value;
        this.jsa.date = new Date(this.f.date.value);
        this.jsa.title = this.f.title.value;
        this.jsa.supervisor = this.f.supervisor.value;
        this.jsa.analysisBy = this.f.analysisBy.value;
        this.jsa.approvedBy = this.f.approvedBy.value;
        this.jsa.location = this.f.location.value;
        this.jsa.department = this.f.department.value;
        this.jsa.dailySafety = this.f.dailySafety.value;

        this.jsa.stepActions = [];
        this.s.controls.forEach((element: any) => {
            let stepActions: StepActionDto = new StepActionDto();
            stepActions.stepSequnce = element.controls.stepSequnce.value;
            stepActions.hazards = element.controls.hazards.value;
            stepActions.actions = element.controls.actions.value;

            this.jsa.stepActions.push(stepActions);
        });
        this.jsa.crewAttendances = [];
        this.c.controls.forEach((element: any) => {
            let crewAttendances: CrewAttendanceDto = new CrewAttendanceDto();
            crewAttendances.printName = element.controls.printName.value;
            crewAttendances.signName = element.controls.signName.value;
            crewAttendances.signIn = element.controls.signIn.value;
            crewAttendances.signOut = element.controls.signOut.value;

            this.jsa.crewAttendances.push(crewAttendances);
        });



    }

    onSubmit() {

        this.submitted = true;
        this.saveForm();

        const controls = this.jsaForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                console.log(name, controls[name])
            }
        }

        if (this.jsaForm.invalid) {
            console.log(this.jsaForm)
            console.log(this.jsaForm.invalid)
            this.error = "Please complete all required fields";
            return;
        }

        this.jsaClient.create(this.jsa).subscribe(() => {
            this.router.navigateByUrl('');
        });
    }

     onChangeStepActions(e) {
        const numberOfStepActions = e.target.value || 0;
        if (this.s.length < numberOfStepActions) {
            for (let i = this.s.length; i < numberOfStepActions; i++) {
                this.s.push(this.formBuilder.group({
                    stepSequnce: ['', Validators.required],
                    hazards: ['', Validators.required],
                    actions: ['', Validators.required],

                }));
            }
        } else {
            for (let i = this.s.length; i >= numberOfStepActions; i--) {
                this.s.removeAt(i);
            }
        }
    }
     onChangeCrewAttendances(e) {
        const numberOfCrewAttendances = e.target.value || 0;
        if (this.c.length < numberOfCrewAttendances) {
            for (let i = this.c.length; i < numberOfCrewAttendances; i++) {
                this.c.push(this.formBuilder.group({
                    printName: ['', Validators.required],
                    signName: ['', Validators.required],
                    signIn: ['', Validators.required],
                    signOut: ['', Validators.required],

                }));
            }
        } else {
            for (let i = this.c.length; i >= numberOfCrewAttendances; i--) {
                this.c.removeAt(i);
            }
        }
    }


    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    isBirthDateValid(date) {
        try {
            if (!date)
                return true;
            let d = new Date(date);
            if (d + '' == "Invalid Date")
                return false;
            else if (d > new Date() || d.getFullYear() < 1900)
                return false;
            else
                return true;
        }
        catch {
            console.log(2);
            return false;
        }
    }
}