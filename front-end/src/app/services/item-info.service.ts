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
}
