import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public stations = [];
  private locations;
  savedLocations = [];

  abbreviations = 'https://api.bart.gov/api/stn.aspx?cmd=stns&key=QJRL-P46X-9EVT-DWE9&json=y';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dServe: DataService,
    private http: HttpClient
  ) {
    this.initializeApp();
    this.dServe.getLocations();
    this.stations = this.dServe.savedLocations;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getLocations() {
    this.locations = this.http.get(this.abbreviations);
    this.locations.subscribe(
      x => {
        for (const s of x.root.stations.station) {
          const locationInfo = {
            name: s.name,
            url: 'folder/' + s.abbr,
            abbr: s.abbr,
            address: s.address,
            city: s.city,
            county: s.county,
            state: s.state,
            zipcode: s.zipcode,
          };
          this.savedLocations.push(locationInfo);
        }
        console.log(this.savedLocations);
      }
    );
  }

  stationInfo() {}

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.stations.findIndex(page => page.name.toLowerCase() === path.toLowerCase());
    }
  }
}
