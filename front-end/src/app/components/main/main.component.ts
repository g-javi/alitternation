/// <reference types='googlemaps' />
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('map') gmapElement: any;
  map: google.maps.Map;
  infoWindow: any;
  constructor(
    private readonly router: Router,
    private _user: UserService,
    private _map: MapService
  ) { }

  ngAfterViewInit() {
    this._user.updateBalance();
  }

  ngOnInit() {

    // this._user.updateBalance();
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

    this._map.getHistoricalSurvey().then((_: any) => {
      _.forEach(area => {

        if (area.Latitude !== '') {
          const contentString = `
            <div class="map-popup">
              <h3>Council: ${area.Council}</h3>
              <p>
                <span>
                  Estimated location size: ${area['Estimated location size']}
                </span>
                <br>
                <span>
                  Total number of items: ${area['Total number of items']}
                </span>
              </p>
            </div>
          `;

          const infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          console.log({ lat: area.Latitude, lng: area.Longitude });
          const marker = new google.maps.Marker({
            position: { lat: area.Latitude, lng: area.Longitude },
            map: map,
            title: `Council: ${area.Council}`
          });
          marker.addListener('click', () => {
            if (this.infoWindow) {
              this.infoWindow.close();
            }
            infowindow.open(map, marker);
            this.infoWindow = infowindow;
          });
        }
      });
    });

  }

  goToImageCapture() {
    this.router.navigate(['/image-capture']);
  }

  goToItemLookup() {
    this.router.navigate(['/item-lookup']);

  }

  goToSignIn() {
    window.location.href = "https://alitternation.com/auth/google";
  }
}
