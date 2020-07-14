import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Propietario } from '../models/propietario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietariosService {

  propietarios:Array<Propietario>;
  urlBase: string ="http://localhost:3000/api/propietarios/" 

  constructor(private _http:HttpClient) { 
    this.propietarios = new Array<Propietario>();
}

getPropietarios():Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({

    })
  };
  return this._http.get( this.urlBase , httpOptions );
}

addPropietario(Propietario: Propietario):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  var body = JSON.stringify(Propietario);
  return this._http.post(this.urlBase, body , httpOptions );
}

deletePropietario(Propietario: Propietario):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({

    })
  };
  return this._http.delete( this.urlBase + Propietario._id , httpOptions );
}

updatePropietario(Propietario: Propietario):Observable<any>{
  //var idBorrar = this.puntosInteres.findIndex((item: PuntoInteres) => item.id == punto.id);    
  //this.puntosInteres.splice(idBorrar, 1,punto);

  const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  var body = JSON.stringify(Propietario);
  return this._http.put(this.urlBase + Propietario._id , body , httpOptions );    

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
