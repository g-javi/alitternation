import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LitterItemsService {
  private readonly SERVER_ENDPOINT = 'https://alitternation.com/';
  private _listSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor() { }

  get list() {
    return this._listSubject.asObservable();
  }

  updateItemList() {
    $.getJSON(this.SERVER_ENDPOINT + 'litter/items').done((_) => {
      this._listSubject.next(_);
    });
  }

  checkBarcode(code: string) {
    return new Promise(resolve => {
      $.getJSON(this.SERVER_ENDPOINT + 'litter/barcode/' + code).done(_ => {
        resolve(_);
      });
    });
  }
}
