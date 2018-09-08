/// <reference types="googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import GeolocationMarker from "geolocation-marker";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('map') gmapElement: any;
  map: google.maps.Map;
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    const mapProp: google.maps.MapOptions = {
      center: {lat: -27.4698, lng: 153.0251},
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      gestureHandling: "greedy",
      disableDefaultUI: true,
    };

    const map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.map = map;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(pos);
        // TODO: not working???
        new GeolocationMarker(map);
      });
    }

  }

  goToImageCapture() {
    this.router.navigate(['/image-capture']);
  }

  goToItemLookup() {
    this.router.navigate(['/item-lookup']);
  }
}
