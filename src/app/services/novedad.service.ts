import { Injectable } from '@angular/core';
import { Novedad } from '../models/novedad';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  novedad: Array<Novedad>;


  urlBase: string ="http://localhost:3000/api/novedades/" 

  constructor(private _http:HttpClient) { 
      this.novedad = new Array<Novedad>();
  }

  getNovedades():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get( this.urlBase , httpOptions );
  }

  addNovedad(novedad: Novedad):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(novedad);
    return this._http.post(this.urlBase, body , httpOptions );
  }

  deleteNovedad(novedad: Novedad):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete( this.urlBase + novedad._id , httpOptions );
  }

  updateNovedad(novedad: Novedad):Observable<any>{
    //var idBorrar = this.puntosInteres.findIndex((item: PuntoInteres) => item.id == punto.id);    
    //this.puntosInteres.splice(idBorrar, 1,punto);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(novedad);
    return this._http.put(this.urlBase + novedad._id , body , httpOptions );    

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
