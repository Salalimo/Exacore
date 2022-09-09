import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  theform: FormGroup;
  thedate: string = '';
  constructor(
    private formBuilder: FormBuilder,

  ) {
  }
  ngOnInit(): void {
    let form = this.formBuilder.group({
      goodCatchId: ['', Validators.required],
      thedate: ['', Validators.required],
    });
    this.theform = form;
  }

  get f() { return this.theform.controls; }


  print() {
    console.log(this.theform.controls['thedate'].value)
  }


}
