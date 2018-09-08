import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { ImageRecognitionService } from '../../services/image-recognition.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private _media: MediaService,
    private _vision: ImageRecognitionService
  ) { }

  ngOnInit() {
    this._media.videoElement = document.getElementById('main-video') as  HTMLVideoElement;
    this._media.currentStream.subscribe(stream => {
      const video = document.getElementById('main-video') as HTMLVideoElement;

      video.srcObject = stream;

      video.onloadedmetadata = () => {
        this._media.setupVideoDimensions(video.videoWidth, video.videoHeight);
      };
    });
  }

  capture() {
    const data = this._media.snapshot();

    this._vision.recognise(data).then(_ => {
      console.log(_);
      alert(_);
    });
    console.log(data);
  }
}
