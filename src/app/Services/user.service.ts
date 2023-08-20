import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  updateUser(id : number ,data: any) {
    return this._http.put(`http://localhost:8080/User/${id}`,data);
  }

  constructor(private _http: HttpClient) { }

  addUser(data : any): Observable<any>
  {
    return this._http.post('http://localhost:8080/User/add',data);
  }
  getUserList(): Observable<any>
  {
    return this._http.get('http://localhost:8080/User/all');
  }
  deleteUser(id : number): Observable<any>
  {
    return this._http.delete(`http://localhost:8080/User/${id}`);
  }

}
