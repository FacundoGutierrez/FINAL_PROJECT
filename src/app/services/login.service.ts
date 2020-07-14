import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  vistaLocales : boolean = false;
  vistaContrato : boolean = false;
  vistaNovedades : boolean = false;
  vistaUsuarios : boolean = false;
  vistaPropietario : boolean = false; 
  userLoggedIn: boolean = false;
  userLogged: Usuario;
  
  constructor(private _http:HttpClient) { 
    this.userLogged = new Usuario();
    this.mostrarHeader();
  }
  public login(usuario: string, password: string):Observable<any> {
  const httpOption = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
  })
  }
  let body = JSON.stringify({ usuario: usuario, password: password });
  return this._http.post('http://localhost:3000/api/usuarios/login', body,
 httpOption);
  }
  public logout() {
  // reseteo las propiedades del service que indican
  // que un usuari esta logueado y cual es el usuario logueado
  this.userLogged = new Usuario();
  this.userLoggedIn = false;
  this.vistaLocales = false;
  this.vistaContrato = false;
  this.vistaNovedades = false;
  this.vistaUsuarios = false;
  this.vistaPropietario = false;
  }

   public mostrarHeader(){
    if(this.userLoggedIn == true)
    {
      if (this.userLogged.perfil  === 'P'){
        this.vistaLocales = false;
        this.vistaContrato = false;
        this.vistaNovedades = true;
        this.vistaUsuarios = false;
        this.vistaPropietario = false;
      }
      else{
       if (this.userLogged.perfil === 'a' || this.userLogged.perfil === 'A'){
         this.vistaLocales = true;
         this.vistaContrato = true;
         this.vistaNovedades = true;
         this.vistaUsuarios = true;
         this.vistaPropietario = true;
        }
        else
        {
          this.vistaLocales = false;
          this.vistaContrato = false;
          this.vistaNovedades = false;
          this.vistaUsuarios = false;
          this.vistaPropietario = false;
        }
      }
    }  
  }

 }
 
