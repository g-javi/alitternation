import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MediaService } from '../../services/media.service';
import { ImageRecognitionService } from '../../services/image-recognition.service';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.scss']
})
export class ImageCaptureComponent implements OnInit {

  constructor(
    private _media: MediaService,
    private _vision: ImageRecognitionService,
    private readonly location: Location,
  ) { }

  ngOnInit() {
    this._media.videoElement = document.getElementById('main-video') as HTMLVideoElement;
    this._media.currentStream.subscribe(stream => {
      const video = document.getElementById('main-video') as HTMLVideoElement;

      if (video) {
        video.srcObject = stream;

        video.onloadedmetadata = () => {
          this._media.setupVideoDimensions(video.videoWidth, video.videoHeight);
        };
      }
    });
  }

  goBack() {
    this.location.back();
  }

  captureImage() {
    const data = this._media.snapshot();

    this._vision.recognise(data).then(_ => {
      console.log(_);
      alert(_);
    });
    console.log(data);
  }
}
