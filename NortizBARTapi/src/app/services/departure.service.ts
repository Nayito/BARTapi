import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartureService {

  // url = ASHB&dest=CIVC&date=now

  private stnArrivePt1 = 'http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=';
  private stnArrivePt2 = '';
  private stnArrivePt3 = '&key=QJRL-P46X-9EVT-DWE9&b=2&a=2&l=1&json=y';

  private fullURL = '';

  constructor() { }
}
