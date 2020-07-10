import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticia';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoticiasComponent } from '../components/noticias/noticias.component';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {


noticias:Array<Noticia>;

  urlBase: string ="http://localhost:3000/api/noticias/" 

  constructor(private _http:HttpClient) { 
      this.noticias = new Array<Noticia>();
  }

  getNoticias():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get( this.urlBase , httpOptions );
  }

  addNoticias(noticia: Noticia):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(noticia);
    return this._http.post(this.urlBase, body , httpOptions );
  }

  deleteNoticias(noticia: Noticia):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete( this.urlBase + noticia._id , httpOptions );
  }

  updateNoticia(noticia: Noticia):Observable<any>{
    //var idBorrar = this.puntosInteres.findIndex((item: PuntoInteres) => item.id == punto.id);    
    //this.puntosInteres.splice(idBorrar, 1,punto);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(noticia);
    return this._http.put(this.urlBase + noticia._id , body , httpOptions );    

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
