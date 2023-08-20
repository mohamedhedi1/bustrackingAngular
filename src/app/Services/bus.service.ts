import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  updateBus(id : number ,data: any) {
    return this._http.put(`http://localhost:8080/Bus/${id}`,data);
  }

  constructor(private _http: HttpClient) { }

  addBus(data : any): Observable<any>
  {
    return this._http.post('http://localhost:8080/Bus/add',data);
  }
  getBusList(): Observable<any>
  {
    return this._http.get('http://localhost:8080/Bus/all');
  }
  deleteBus(id : number): Observable<any>
  {
    return this._http.delete(`http://localhost:8080/Bus/${id}`);
  }

}
