import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  /** Credit in cents */
  private credit: number = 4210;

  private username: string = "{{username}}";

  user$: Observable<any>;
  constructor(
    private _user: UserService,
    private readonly location: Location
  ) {
    this.user$ = _user._currentUser.asObservable();
  }

  ngOnInit() {
    this._user.updateBalance();
  }

  goBack() {
    this.location.back();
  }

  makeUrl(id: string) {
    const newURL = id.split('?');

    return newURL[0] + '?z=150';
  }
}
