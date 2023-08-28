import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  updateStation(id : number ,data: any) {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.put(`http://localhost:8080/Station/${id}`,data, { headers });
  }

  constructor(private _http: HttpClient) { }

  addStation(data : any): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.post('http://localhost:8080/Station/add',data,{ headers });
  }


  getStationList(): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get('http://localhost:8080/Station/all',{ headers });
  }

  deleteStation(id : number): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.delete(`http://localhost:8080/Station/${id}`,{ headers });
  }

  

}
