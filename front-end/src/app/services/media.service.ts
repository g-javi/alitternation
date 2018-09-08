import { Injectable } from '@angular/core';
import { MediaInputDevice } from '../models/media.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private _mediaDevicesSubject: BehaviorSubject<MediaDeviceInfo[]>;
  private _defaultStream: BehaviorSubject<MediaStream>;
  constructor() {
    this.getStream();
    this._mediaDevicesSubject = new BehaviorSubject<MediaDeviceInfo[]>([]);
    this._defaultStream = new BehaviorSubject<MediaStream>(null);
    this.updateMediaDeviceList();
  }

  get mediaDevices() {
    return this._mediaDevicesSubject.asObservable();
  }

  get currentStream() {
    return this._defaultStream.asObservable();
  }

  updateMediaDeviceList() {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      this._mediaDevicesSubject.next(devices.filter(_ => _.kind === 'videoinput'));
    }).catch(e => {
      console.warn(e);
      alert('Unable to access the Camera!');
    });
  }

  getStream(videoSource?: string) {
    const constrains = {
      video: { deviceId: videoSource ? { exact: videoSource } : undefined }
    };
    navigator.mediaDevices.getUserMedia(constrains).then(stream => {
      this._defaultStream.next(stream);
    }).catch(e => {
      console.warn(e);
      alert('Unable to access the Camera!');
    });
  }
}
