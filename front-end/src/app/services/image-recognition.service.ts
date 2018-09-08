import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageRecognitionService {
  private readonly API_KEY = 'AIzaSyDfBfS_NamF_ww_lML_t5G8gB5ugguEMy8';
  private readonly END_POINT = 'https://vision.googleapis.com/v1/images:annotate?key=' + this.API_KEY;
  constructor() { }
}
