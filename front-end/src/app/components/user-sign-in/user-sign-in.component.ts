import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent implements OnInit {

  constructor(
    private readonly location: Location
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
