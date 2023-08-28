import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  addUser(value: any): Observable<any> {
    
    return  this._http.post('http://localhost:8080/authenticate/register',value);
  }

  

  getUserListAffectedAndNotAffected(id : number) : Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get(`http://localhost:8080/User/getAffectedAndNotAffectedUser/${id}`, { headers });
  }

  getUserListAffected(id : number) : Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get(`http://localhost:8080/User/getAffectedUser/${id}`, { headers });
  }

  getUserListNotAffected(): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get('http://localhost:8080/User/getUserNotAffected', { headers });
  }

  getUserList(): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get('http://localhost:8080/User/all', { headers });
  }

  deleteUser(id : number)
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.delete(`http://localhost:8080/User/${id}`,{ headers });
  }

  affectUsersToBus(idBus : number, userId : number)
  {   const token = localStorage.getItem('access_token');
  const headers = {
    'Authorization': `Bearer ${token}`
  };
    return this._http.post(`http://localhost:8080/User/${userId}/thisbus/${idBus}`,userId, { headers });
  }


  getUserByCode(userCode: String): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get(`http://localhost:8080/User/Code/${userCode}`, { headers });
  }

}
