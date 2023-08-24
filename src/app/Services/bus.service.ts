import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../model/Bus';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  constructor(private _http: HttpClient, private _userService: UserService) {}

  getBusList(): Observable<any> {
    return this._http.get('http://localhost:8080/Bus/all');
  }

  getListUsersByBus(id: number): Observable<any> {
    return this._http.get(`http://127.0.0.1:8080/Bus/UsersByBusId/${id}`);
  }

  updateBus(busData: any, bus: any, users: any) {
    this.disassociateUserBus(busData.id);
    return this._http.put(`http://localhost:8080/Bus/edit/${busData.id}/${bus.bus}`, users);
  }
  
  addBus(nom: any, list: any): Observable<any> {
    const c: Bus = new Bus(nom.bus, list);
    return this._http.post('http://localhost:8080/Bus/add', c);
  }

  disassociateUserBus(busId: number) {
    return this._http.put(`http://localhost:8080/Bus/disassociateUserBus/${busId}`, []);
  }

  affectCircuitToBus(busId : number , circuit : any)
  {
    return this._http.post(`http://localhost:8080/Bus/affectCircuitToBus/${circuit.circuit.id}/${busId}`,[]);
  }

  
  deleteBus(id: number)
  {
    return this._http.delete(`http://localhost:8080/Bus/${id}`);
  }







}

