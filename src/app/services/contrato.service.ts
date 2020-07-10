import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contrato } from '../models/contrato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  contrato : Contrato;
  contratos: Array<Contrato>;

  urlBase: string ="http://localhost:3000/api/contratos/" 
  
constructor(private _http:HttpClient) { 
  this.contratos = new Array<Contrato>();
}

getContratos():Observable<any>{
const httpOptions = {
  headers: new HttpHeaders({

  })
};
return this._http.get( this.urlBase , httpOptions );
}

addContrato(contrato: Contrato):Observable<any>{
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
var body = JSON.stringify(contrato);
return this._http.post(this.urlBase, body , httpOptions );
}

deleteContrato(contrato:Contrato):Observable<any>{
const httpOptions = {
  headers: new HttpHeaders({

  })
};
return this._http.delete( this.urlBase +contrato._id , httpOptions );
}

updateContrato( contrato:Contrato):Observable<any>{
//var idBorrar = this.puntosInteres.findIndex((item: PuntoInteres) => item.id == punto.id);    
//this.puntosInteres.splice(idBorrar, 1,punto);

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
var body = JSON.stringify(contrato);
return this._http.put(this.urlBase +contrato._id , body , httpOptions );    

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
