import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public _currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

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
}
