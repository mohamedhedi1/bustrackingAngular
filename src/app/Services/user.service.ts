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
    return this._http.get('http://localhost:8080/User/all');
  }
<<<<<<< HEAD
}
=======

  deleteUser(id : number)
  {
    return this._http.delete(`http://localhost:8080/User/${id}`);
  }
}
>>>>>>> 5860e8123138a58644bb06daae4b214b208f3438
