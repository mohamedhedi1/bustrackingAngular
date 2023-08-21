import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient) { }
  
  login(data : any): Observable<any>
  {

      const outputObject = {
        "userCode": data.userCode,
        "password": data.password
      };
      const jsonString = JSON.stringify(outputObject);
    console.log("ouiiiiiiiiii");
    console.log(jsonString);
    return this._http.post('http://localhost:8080/authenticate/login',jsonString);
  }


}
