import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Bus } from '../model/Bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {
 /* updateBus(id : number ,data: any) {
    return this._http.put(`http://localhost:8080/Bus/${id}`,data);
  }*/

  constructor(private _http: HttpClient) { }

 /* addBus(data : any): Observable<any>
  {
    return this._http.post('http://localhost:8080/Bus/add',data);
  }*/
  getBusList(): Observable<any>
  {
    return this._http.get('http://localhost:8080/Bus/all');
  }
  deleteBus(id : number): Observable<any>
  {
    return this._http.delete(`http://localhost:8080/Bus/${id}`);
  }
  getListUsersByBus(id : number): Observable<any>
  {
    return this._http.get(`http://127.0.0.1:8080/Bus/UsersByBusId/${id}`);
  }

  updateBus(busData : any ,bus : any): Observable<any>
  { console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log(busData.id); 
    console.log(bus);
    console.log("busssss")
    console.log(bus)
    return this._http.put(`http://localhost:8080/Bus/edit/${busData.id}`,bus);
  }
  addBus(nom : any,list : any): Observable<any>
  {
    const c: Bus = new Bus(nom.bus, list);
    
    console.log(c);

    return this._http.post('http://localhost:8080/Bus/add',c);
  }


}
