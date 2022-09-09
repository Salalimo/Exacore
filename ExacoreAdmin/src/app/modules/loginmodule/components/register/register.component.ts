import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { first } from 'rxjs/operators';


@Component({
    templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {


    roles: any[] = [];
    bizs: any[] = [];
    submitted = false;
    registerForm: FormGroup;

    error: string = '';
    canAdd: boolean = false;
    selectedBiz: boolean = false;
    selectedRole: boolean = false;
    showBizTextBox: boolean = false;


    constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private router: Router,

    ) {

    }
    get f() { return this.registerForm.controls; }


    ngOnInit() {

        this.accountService.getRoles().subscribe((data) => {
            this.roles = data;
            // this.f.role.setValue(0);
        });

        this.registerForm = this.formBuilder.group({
            businessName: [''],
            role: [0, Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phone: ['', Validators.required],
            street1: ['', Validators.required],
            street2: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            associationId: [0],
            // securityQuestion1: ['Please select a question', Validators.required],
            // securityAnswer1: ['', Validators.required],
            // securityQuestion2: ['Please select a question', Validators.required],
            // securityAnswer2: ['', Validators.required],

        },
            { validators: [this.checkPasswords,] }
        );
    }


    onSubmit() {

        this.error = '';
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            console.log(this.registerForm, this.registerForm.invalid)
            this.error = "Please complete all required fields";
            return;
        }

        let user: any = {};
        let address: any = {};
        let business: any = {};
        let contact: any = {};
        let role: any = {};


        contact.firstName = this.f['firstName'].value;
        contact.lastName = this.f['lastName'].value;
        contact.phone = this.f['phone'].value;

        user.email = this.f['email'].value;
        user.password = this.f['password'].value;
        role.roleId = this.f['role'].value;


        let dto: any = {};
        dto.address = address;
        dto.business = business;
        dto.contact = contact;
        dto.user = user;
        dto.role = role;

        this.accountService.register(dto)
            .pipe(first())
            .subscribe(
                () => {
                    this.router.navigateByUrl('registerationconfirmation');
                },
                error => {
                    console.log(error)
                    this.error = error;
                });
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        const password = group.get('password').value;
        const confirmPassword = group.get('confirmPassword').value;
        return password === confirmPassword ? null : { notSame: true }
    }


    login() {
        this.router.navigateByUrl('login');
    }
}
