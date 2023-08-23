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

  deleteBus(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8080/Bus/${id}`);
  }

  getListUsersByBus(id: number): Observable<any> {
    return this._http.get(`http://127.0.0.1:8080/Bus/UsersByBusId/${id}`);
  }

  updateBus(busData: any, bus: any, users: any) {
    console.log("this is my userssss");
    console.log(users);
    this.disassociateUserBus(busData.id);

    // Loop through users array and perform operations
  //  for (const item of users) {
     // console.log(item["id"]);
      //this._userService.affectUsersToBus(busData.id, item["id"]);
      //this._http.post(`http://localhost:8080/User/${userId}/thisbus/${idBus}`,userId);
   // }

    return this._http.put(`http://localhost:8080/Bus/edit/${busData.id}/${bus.bus}`, users);
  }
  
  addBus(nom: any, list: any): Observable<any> {
    const c: Bus = new Bus(nom.bus, list);
    return this._http.post('http://localhost:8080/Bus/add', c);
  }

  disassociateUserBus(busId: number) {
    return this._http.put(`http://localhost:8080/Bus/disassociateUserBus/${busId}`, []);
  }
}

