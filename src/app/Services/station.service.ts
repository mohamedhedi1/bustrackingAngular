import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private _http: HttpClient) { }

  addStation(data : any): Observable<any>
  {
    return this._http.post('http://localhost:8080/Station/add',data);
  }
  getStationList(): Observable<any>
  {
    return this._http.get('http://localhost:8080/Station/all');
  }
  deleteStation(id : number): Observable<any>
  {
    return this._http.delete("");
  }

}