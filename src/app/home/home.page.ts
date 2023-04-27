import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map: any;

  constructor(private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {
    const mapOptions = {
      zoom: 12 // set zoom level
    };

    this.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    // get current position of device
    navigator.geolocation.getCurrentPosition((position) => {
      const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      // center map on user's location
      this.map.setCenter(location);

      // add marker to user's location
      const marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Your location'
      });
    }, (error) => {
      console.log('Error getting location', error);
    });
  }
}
