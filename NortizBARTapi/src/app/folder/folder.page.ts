import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public stationData: string;
  bartURL = 'https://api.bart.gov/api/stn.aspx?cmd=stns&key=ZYR9-576X-86QT-DWE9&json=y';
  myKey = 'ZYR9-576X-86QT-DWE9';
  private stationApi;
  private stationURL;
  private station;
  private stationD;
  private stationInfo;
  private sInfo;
  public stations = [];

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private dServe: DataService) {
    this.dServe.getLocations();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.folder);
    const scheduleURL =
      `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${this.folder}&key=MW9S-E7SL-26DU-VV8V&json=y`;
    console.log(scheduleURL);
    this.getData(scheduleURL);

    const stationURL = `http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${this.folder}&key=MW9S-E7SL-26DU-VV8V&json=y`;
    console.log(stationURL);
    this.getStationData(stationURL);
  }

  getData(url) {
    this.stationApi = this.http.get(url);
    this.stationApi.subscribe(
      x => {
        this.station = x.root.station[0];
        console.log(this.station);
      }
    );
  }

  getStationData(url) {
    this.stationD = this.http.get(url);
    this.stationD.subscribe(
      x => {
        console.log(x);
        this.sInfo = x.root.stations.station;
        console.log(this.sInfo);
      }
    );
  }
}
