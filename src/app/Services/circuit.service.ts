import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Circuit } from '../model/Circuit';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {
  constructor(private _http: HttpClient) { }


  addCircuit(nom : any,list : any): Observable<any>
  {
    const c: Circuit = new Circuit(nom.nom, list);
    console.log(c);

    return this._http.post('http://localhost:8080/Circuit/add',c);
  }

  getCircuitList(): Observable<any>
  {
    return this._http.get('http://127.0.0.1:8080/Circuit/all');
  }
  

  deleteCircuit(id : number): Observable<any>
  {
    return this._http.delete(`http://localhost:8080/Circuit/${id}`);
  }

  getListStationByCircuit(id : number): Observable<any>
  {
    return this._http.get(`http://127.0.0.1:8080/Circuit/StationsbyCircuitId/${id}`);
  }

  getListStationNotAffected(): Observable<any>
  {
    return this._http.get(`http://localhost:8080/Station/allNotAffected`);
  }

  getListAffectedAndNotAffected(id : number): Observable<any>
  {
    return this._http.get(`http://localhost:8080/Station/AffectedAndNotAffected/${id}`);
  } 


  updateCircuit(circuit : any,data : any, list : any): Observable<any>
  {
    return this._http.put(`http://localhost:8080/Circuit/${circuit.id}/${data.nom}`,list);
  }
}
