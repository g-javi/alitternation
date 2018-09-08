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
  private _dialogRef: MatDialogRef<BarcodeComponent, any>;
  constructor(private _dialog: MatDialog) {
    this._codeReader = new BrowserBarcodeReader();
    this._videoDevices = [];
    this.getDevices();

    window['_codeReader'] = this;
  }

  openBarcodeDialog() {
    this._dialogRef = this._dialog.open(BarcodeComponent, {
      height: '300px',
      width: '500px',
    });
    const openSub = this._dialogRef.afterOpen().subscribe(_  => {
      this.readBarcode(this._videoDevices[0].id).then(result => {
        alert(result);
      });
    });

    this._dialogRef.afterClosed().toPromise().then(_ => openSub.unsubscribe());
  }

  readBarcode(deviceId: string, elementId: string = 'video'): Promise<string | null> {
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
    this._codeReader.getVideoInputDevices()
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
