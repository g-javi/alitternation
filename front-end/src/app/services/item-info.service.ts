import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ItemInfoService {
  private readonly SERVER_ENDPOINT = 'http://localhost:8080/';
  public activeItem: any;

  itemInstructions(id: string) {
    return new Promise(resolve => {
      $.getJSON(this.SERVER_ENDPOINT + 'litter/instructions/' + id).done((_) => {
        resolve(_);
      });
    });
  }

  // TODO: Observable?
  getItemById(id: string) {
    return new Promise(resolve => {
      $.getJSON(this.SERVER_ENDPOINT + 'litter/items/' + id).done((_) => {
        resolve(_);
      });
    });
  }

  // TODO: Observable?
  getItemByBarcode(code: string) {
    return new Promise(resolve => {
      $.getJSON(this.SERVER_ENDPOINT + 'litter/barcode/' + code).done(_ => {
        resolve(_);
      });
    });
  }
}
