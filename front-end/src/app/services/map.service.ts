import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private readonly SERVER_ENDPOINT = 'https://alitternation.com/';

  constructor() { }

  getHistoricalSurvey() {
    return new Promise(resolve => {
      $.getJSON(this.SERVER_ENDPOINT + 'survey/all').done((_) => {
        resolve(_);
      });
    });
  }

  getReportedSurvey() {
    return new Promise(resolve => {
      $.getJSON(this.SERVER_ENDPOINT + 'litter/records/all').done((_) => {
        resolve(_);
      });
    });
  }
}
