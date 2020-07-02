import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


usuarios:Array<Usuario>;

  urlBase: string ="http://localhost:3000/api/usuarios/" 

  constructor(private _http:HttpClient) { 
      this.usuarios = new Array<Usuario>();
  }

  getUsuarios():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get( this.urlBase , httpOptions );
  }

  addUsuarios(usuario: Usuario):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(usuario);
    return this._http.post(this.urlBase, body , httpOptions );
  }

  deleteUsuarios(usuario: Usuario):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete( this.urlBase + usuario._id , httpOptions );
  }

  updateUsuario(usuario: Usuario):Observable<any>{
    //var idBorrar = this.puntosInteres.findIndex((item: PuntoInteres) => item.id == punto.id);    
    //this.puntosInteres.splice(idBorrar, 1,punto);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(usuario);
    return this._http.put(this.urlBase + usuario._id , body , httpOptions );    

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
