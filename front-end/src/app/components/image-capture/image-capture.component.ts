import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.scss']
})
export class ImageCaptureComponent implements OnInit {

  constructor(
    private readonly location: Location,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  captureImage() {
    alert("Not implemented");
    throw new Error("Not implemented");
  }
}
