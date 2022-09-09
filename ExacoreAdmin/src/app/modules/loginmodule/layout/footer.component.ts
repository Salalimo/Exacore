import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
,
})
export class FooterComponent implements OnInit {

  year: number = 2020;

  constructor() { }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }
}
