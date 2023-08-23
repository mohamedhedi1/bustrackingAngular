import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUserListAffectedAndNotAffected(id : number) : Observable<any>
  {
    return this._http.get(`http://localhost:8080/User/getAffectedAndNotAffectedUser/${id}`);
  }

  getUserListAffected(id : number) : Observable<any>
  {
    return this._http.get(`http://localhost:8080/User/getAffectedUser/${id}`);
  }

  getUserListNotAffected(): Observable<any>
  {
    return this._http.get('http://localhost:8080/User/getUserNotAffected');
  }

  getUserList(): Observable<any>
  {
    return this._http.get('http://localhost:8080/User/all');
  }

  deleteUser(id : number)
  {
    return this._http.delete(`http://localhost:8080/User/${id}`);
  }

  affectUsersToBus(idBus : number, userId : number)
  {   console.log(`http://localhost:8080/User/${userId}/thisbus/${idBus}`)
    return this._http.post(`http://localhost:8080/User/${userId}/thisbus/${idBus}`,userId);
  }

}
