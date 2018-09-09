import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private readonly SERVER_ENDPOINT = 'http://localhost:8080/';

  constructor() { }

  getHistoricalSurvey() {
    return new Promise(resolve => {
      $.getJSON(this.SERVER_ENDPOINT + 'survey/all').done((_) => {
        resolve(_);
      });
    });
  }
}
