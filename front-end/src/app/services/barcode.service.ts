import { Injectable } from '@angular/core';
import { BrowserBarcodeReader } from '@zxing/library';
import { BarcodeComponent } from '../components/barcode/barcode.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  private _codeReader: any;
  public _videoDevices: any[];
  constructor() {
    this._codeReader = new BrowserBarcodeReader();
    this._videoDevices = [];
    this.getDevices();

    window['_codeReader'] = this;
  }

  openBarcodeDialog() {
    if (this._videoDevices[0]) {
      this.readBarcode(this._videoDevices[0].id).then(result => {
        // this._codeReader.reset();
        alert(result);
      });
    } else {
      this.getDevices().then(_ => this.openBarcodeDialog());
    }
  }

  readBarcode(deviceId: string, elementId: string = 'main-video'): Promise<string | null> {
    return new Promise(resolve => {
      this._codeReader.decodeFromInputVideoDevice(deviceId, elementId)
        .then(result => {
          console.log(result.text);
          resolve(result.text);
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  }

  getDevices() {
    this._videoDevices = [];
    return this._codeReader.getVideoInputDevices()
      .then(videoInputDevices => {
        videoInputDevices.forEach(device => {
          console.log(`${device.label}, ${device.deviceId}`);
          this._videoDevices.push({
            id: device.deviceId,
            label: device.label
          });
        });
      })
      .catch(err => console.error(err));
  }
}
