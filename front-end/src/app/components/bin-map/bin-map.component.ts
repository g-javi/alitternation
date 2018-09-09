/// <reference types='googlemaps' />
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BinService } from "../../services/bin.service";

@Component({
  selector: 'app-bin-map',
  templateUrl: './bin-map.component.html',
  styleUrls: ['./bin-map.component.scss']
})
export class BinMapComponent implements OnInit {
  @ViewChild('map') gmapElement: any;
  map: google.maps.Map;

  constructor(
    private readonly location: Location,
    public _binService: BinService
    ) { }

  ngOnInit() {
    const mapProp: google.maps.MapOptions = {
      center: {lat: -27.4698, lng: 153.0251},
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      gestureHandling: 'greedy',
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
      });
    }

    this._binService.getBins().then((binData) => {
      binData.forEach((bin) => {
        new google.maps.Marker({
          position: {
            lat: bin.latitude,
            lng: bin.longitude
          },
          map: map,
          title: "Bin"
        });
      });
    });

  }

  goBack() {
    this.location.back();
  }

}
