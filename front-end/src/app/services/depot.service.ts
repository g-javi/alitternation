import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private readonly SERVER_ENDPOINT = 'http://localhost:8080/';
  constructor() { }

  getDepots(): Promise<any[]> {
    return new Promise(resolve => {
      $.getJSON(this.SERVER_ENDPOINT + 'centres/all').done((depotData) => {
        resolve(depotData);
      });
    });
  }
}