import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private readonly VIDEO_PIXELS = 224;
  private _mediaDevicesSubject: BehaviorSubject<MediaDeviceInfo[]>;
  private _defaultStream: BehaviorSubject<MediaStream>;
  private _snapShotCanvas: HTMLCanvasElement;
  private _videoElement: HTMLVideoElement;
  private _aspectRatio: number;

  constructor() {
    this._snapShotCanvas = document.createElement('canvas');
    // this.getStream();
    this._mediaDevicesSubject = new BehaviorSubject<MediaDeviceInfo[]>([]);
    this._defaultStream = new BehaviorSubject<MediaStream>(null);
    // this.updateMediaDeviceList();
  }

  set videoElement(element: HTMLVideoElement) {
    this._videoElement = element;
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
      this.updateMediaDeviceList();
    }).catch(e => {
      console.warn(e);
      alert('Unable to access the Camera!');
    });
  }

  setupVideoDimensions(width: number, height: number) {
    this._aspectRatio = width / height;

    if (width >= height) {
      this._videoElement.height = this.VIDEO_PIXELS;
      this._videoElement.width = this._aspectRatio * this.VIDEO_PIXELS;
    } else {
      this._videoElement.width = this.VIDEO_PIXELS;
      this._videoElement.height = this.VIDEO_PIXELS / this._aspectRatio;
    }
  }

  pauseMedia() {
    if (this._videoElement.played) {
      this._videoElement.pause();
    }
  }

  unPauseMedia() {
    if (this._videoElement.paused) {
      this._videoElement.play();
    }
  }

  snapshot() {
    this._snapShotCanvas.height = this._videoElement.height;
    this._snapShotCanvas.width = this._videoElement.width;
    const ctx = this._snapShotCanvas.getContext('2d');
    ctx.drawImage(this._videoElement, 0, 0, this._snapShotCanvas.width, this._snapShotCanvas.height);
    // const link = document.createElement('a');
    // link.download = 'filename.png';
    // link.href = this._snapShotCanvas.toDataURL();
    // link.click();
    return this._snapShotCanvas.toDataURL().replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  }
}
