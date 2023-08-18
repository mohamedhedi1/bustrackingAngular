import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {
  addCircuit(data : any): Observable<any>
  {
    return this._http.post('',data);
  }
  updateCircuit(id : number ,data: any) {
    return this._http.put(`${id}`,data);
  }

  constructor(private _http: HttpClient) { }
  
  getCircuitList(): Observable<any>
  {
    return this._http.get('http://127.0.0.1:8080/Circuit/all');
  }
  

  deleteCircuit(id : number): Observable<any>
  {
    return this._http.delete(`${id}`);
  }

 
}
