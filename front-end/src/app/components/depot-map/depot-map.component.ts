/// <reference types='googlemaps' />
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DepotService } from "../../services/depot.service";

@Component({
  selector: 'app-depot-map',
  templateUrl: './depot-map.component.html',
  styleUrls: ['./depot-map.component.scss']
})
export class DepotMapComponent implements OnInit {
  @ViewChild('map') gmapElement: any;
  map: google.maps.Map;

  constructor(
    private readonly location: Location,
    public _depotService: DepotService
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

    this._depotService.getDepots().then((depotData) => {
      depotData.forEach((depot) => {
        let marker = new google.maps.Marker({
          position: {
            lat: depot.Latitude,
            lng: depot.Longitude
          },
          map: map,
          title: depot.Name
        });

        let infoWindow = new google.maps.InfoWindow({
          content: '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+depot.Name+'</h1>'+
            '<div id="bodyContent">'+
            '<p>Address: '+depot.Address+'</p>'+
            '<p>Opening Hours: '+depot["Opening Hours"]+'</p>'+
            '<p>Contact: '+depot.Contact+'</p>'+
            '</div>'+
            '</div>'
        });

        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });
      });
    });

  }

  goBack() {
    this.location.back();
  }

}
