import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUserList(): Observable<any>
  {
    return this._http.get('http://localhost:8080/User/allUsers');
  }

  deleteUser(id : number)
  {
    return this._http.delete(`http://localhost:8080/User/${id}`);
  }

  /*affectUsersToBus(idBus : number, userId : number)
  {   
    return this._http.post(`http://localhost:8080/User/${userId}/thisbus/${idBus}`);
  }*/

}
