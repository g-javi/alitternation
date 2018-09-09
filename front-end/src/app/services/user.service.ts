import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Subject, BehaviorSubject } from 'rxjs';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public _currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  private readonly SERVER_ENDPOINT = 'https://alitternation.com/';

  constructor(private _cookieService: CookieService) {
    try {
      this._currentUser.next(JSON.parse(this.getCookie('user_details')));
    } catch (error) {
      this._currentUser.next(undefined);
    }

    window['_currentUser'] = this;
  }

  getCookie(key: string) {
    return this._cookieService.get(key);
  }

  updateBalance() {
    return new Promise(resolve => {
      $.getJSON(this.SERVER_ENDPOINT + 'user/balance/' + this._currentUser.value.googleId).done((_) => {
        const currentValues = this._currentUser.value;
        currentValues.balance = _.balance;
        // console.log(_);
        this._currentUser.next(currentValues);
      });
    });
  }
}
