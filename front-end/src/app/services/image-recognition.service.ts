import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ImageRecognitionService {
  private readonly API_KEY = 'AIzaSyDfBfS_NamF_ww_lML_t5G8gB5ugguEMy8';
  // tslint:disable-next-line:max-line-length
  private readonly END_POINT = 'https://content-vision.googleapis.com/v1/images:annotate?alt=json&key=AIzaSyDfBfS_NamF_ww_lML_t5G8gB5ugguEMy8';
  public searchResults = [];
  constructor() { }

  recognise(imageData: string) {
    this.searchResults = [];
    return new Promise(resolve => {
      const data = {
        'requests': [
          {
            'image': {
              'content': imageData
            },
            'features': [
              {
                'maxResults': 10,
                'type': 'WEB_DETECTION'
              }
            ]
          }
        ]
      };
      $.ajax
        ({
          type: 'POST',
          url: this.END_POINT,
          data: JSON.stringify(data),
          contentType: 'application/json',
          success: (v) => {
            resolve(v);
          }
        });
    });
  }
}
