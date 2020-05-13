import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private stnKeyPt1 = 'http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=&key=QJRL-P46X-9EVT-DWE9&json=y';

  locations;
  savedLocations = [];
  private fullURL = '';

  abbreviations = 'https://api.bart.gov/api/stn.aspx?cmd=stns&key=QJRL-P46X-9EVT-DWE9&json=y';
  constructor(private http: HttpClient) {
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

}
