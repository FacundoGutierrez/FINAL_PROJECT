import { Injectable } from '@angular/core';
import { Local } from '../models/local';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  local: Local;
  locales:Array<Local>;

  urlBase: string ="http://localhost:3000/api/locales/" 

  constructor(private _http:HttpClient) { 
      this.locales = new Array<Local>();

     
  }
  getLocaleAlq():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get( this.urlBase + 'no' , httpOptions );
  }

  getLocales():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get( this.urlBase , httpOptions );
  }

  addLocales(local:Local):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(local);
    return this._http.post(this.urlBase, body , httpOptions );
  }

  deleteLocales(local: Local):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete( this.urlBase + local._id , httpOptions );
  }

  updateLocal(local: Local):Observable<any>{
    //var idBorrar = this.puntosInteres.findIndex((item: PuntoInteres) => item.id == punto.id);    
    //this.puntosInteres.splice(idBorrar, 1,punto);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(local);
    return this._http.put(this.urlBase + local._id , body , httpOptions );    

  }



/*   getIdDisponible(){
    var maxid: number;
    maxid = 0;
    for( var i= 0; i < this.puntosInteres.length; i++){
      if(maxid < this.puntosInteres[i].id){
        maxid = this.puntosInteres[i].id
      }
    }
    return (maxid + 1);
  } */

}