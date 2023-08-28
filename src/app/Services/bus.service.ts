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
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get('http://localhost:8080/Bus/all', { headers });
  }

  getListUsersByBus(id: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get(`http://127.0.0.1:8080/Bus/UsersByBusId/${id}`, { headers });
  }

  updateBus(busData: any, bus: any, users: any) {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    this.disassociateUserBus(busData.id);
    return this._http.put(`http://localhost:8080/Bus/edit/${busData.id}/${bus.bus}`, users, { headers });
  }
  
  addBus(nom: any, list: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const c: Bus = new Bus(nom.bus, list);
    return this._http.post('http://localhost:8080/Bus/add', c, { headers });
  }

  disassociateUserBus(busId: number) {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.put(`http://localhost:8080/Bus/disassociateUserBus/${busId}`, [], { headers });
  }

  affectCircuitToBus(busId : number , circuit : any)
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.post(`http://localhost:8080/Bus/affectCircuitToBus/${circuit.circuit.id}/${busId}`,[], { headers });
  }

  
  deleteBus(id: number)
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.delete(`http://localhost:8080/Bus/${id}`,{ headers });
  }







}

