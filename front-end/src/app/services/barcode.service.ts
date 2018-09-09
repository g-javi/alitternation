import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserBarcodeReader } from '@zxing/library';
import { LitterItemsService } from './litter-items.service';
import { ItemInfoService } from './item-info.service';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  private _codeReader: any;
  public _videoDevices: any[];

  constructor(
    private _litterService: LitterItemsService,
    private _itemInfo: ItemInfoService,
    private _router: Router,

  ) {
    this._codeReader = new BrowserBarcodeReader();
    this._videoDevices = [];
    this.getDevices();

    window['_codeReader'] = this;
  }

  openBarcodeDialog() {
    this._codeReader = new BrowserBarcodeReader();
    if (this._videoDevices[0]) {
      this.readBarcode(this._videoDevices[0].id).then(result => {
        this._litterService.checkBarcode(result).then((response: any) => {
          if (!!response) {
            this._itemInfo.activeItem = response;
            this._router.navigate(['item-detail-info', response._id]);
          } else {
            this._router.navigate(['item-lookup']);
          }
          this._codeReader.reset();
        });
      });
    } else {
      this.getDevices().then(_ => this.openBarcodeDialog());
    }
  }

  readBarcode(deviceId: string, elementId: string = 'main-video'): Promise<string | null> {
    return new Promise(resolve => {
      this._codeReader.decodeFromInputVideoDevice(deviceId, elementId)
        .then(result => {
          // console.log(result.text);
          resolve(result.text);
        })
        .catch(err => {
          // console.error(err);
          resolve(null);
        });
    });
  }

  getDevices() {
    this._videoDevices = [];
    return this._codeReader.getVideoInputDevices()
      .then(videoInputDevices => {
        videoInputDevices.forEach(device => {
          // console.log(`${device.label}, ${device.deviceId}`);
          this._videoDevices.push({
            id: device.deviceId,
            label: device.label
          });
        });
      })
      .catch(err => console.error(err));
  }
}
