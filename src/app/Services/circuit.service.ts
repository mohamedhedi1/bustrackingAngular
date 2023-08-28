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
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const c: Circuit = new Circuit(nom.nom, list);
    console.log(c);

    return this._http.post('http://localhost:8080/Circuit/add',c , { headers });
  }

  getCircuitList(): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get('http://127.0.0.1:8080/Circuit/all', { headers });
  }
  

  deleteCircuit(id : number): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.delete(`http://localhost:8080/Circuit/${id}`, { headers });
  }

  getListStationByCircuit(id : number): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get(`http://127.0.0.1:8080/Circuit/StationsbyCircuitId/${id}`, { headers });
  }

  getListStationNotAffected(): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get(`http://localhost:8080/Station/allNotAffected`, { headers });
  }

  getListAffectedAndNotAffected(id : number): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get(`http://localhost:8080/Station/AffectedAndNotAffected/${id}`, { headers });
  } 


  updateCircuit(circuit : any,data : any, list : any): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.put(`http://localhost:8080/Circuit/${circuit.id}/${data.nom}`,list, { headers });
  }

  
  getCircuitsListNotAffectedTobus(): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get('http://localhost:8080/Circuit/circuitsListNotAffectedTobus',{ headers });
  }

  getCircuitsListNotAffectedAndAffected(id : number){
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this._http.get(`http://localhost:8080/Circuit/circuitsListNotAffectedAndAffected/${id}`,{ headers })
  }

  
}
