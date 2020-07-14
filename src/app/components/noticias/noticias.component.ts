import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import { LoginService } from 'src/app/services/login.service';
import { FacebookService, InitParams, LoginResponse } from 'ngx-fb';
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticia: Noticia;
  noticias: Array<Noticia>;
  usuario: Usuario;
  usuarios: Array<Usuario>;
  mostrarNoticias: boolean = false;
  
  
  constructor(private noticiasService:NoticiaService, public loginService:LoginService, private fb: FacebookService, private _toastr: ToastrService) {
     this.noticias = new Array<Noticia>();
     this.noticia = new Noticia();
     this.usuario = new Usuario();
     this.usuarios = new Array<Usuario>();
     this.cargarNoticias();
     this.iniciarFb();
   }

  ngOnInit(): void {
  }

  public cargarNoticias(){
    this.noticias = new Array<Noticia>();
    this.noticiasService.getNoticias().subscribe(
      (result)=>{
        var not: Noticia = new Noticia();
       Object.assign(this.noticias, result)
       console.log(this.noticias)
          not = new Noticia();
      },

      (error) => {
        console.log(error);
      }
    )
  }

  guardarNoticia(){
    
    this.noticia.fecha = new Date();
    this.noticia.usuario = this.loginService.userLogged;
    this.noticia.vigente = true;
    this.postFb();
    this.noticiasService.addNoticias(this.noticia).subscribe(
      (result)=>{
        this._toastr.success("Ha tenido éxito", "Éxito");
        this.refrescarNoticias();
        this.noticia = new Noticia();
       
      },
      (error)=>{
        console.log(error);
        this._toastr.error("Ha tenido error", "Error");
      }
    )

    
    console.log(this.noticia);

  }

  refrescarNoticias(){
    //this.puntosInteres = this.puntoService.getPuntos();
    this.noticias = new Array<Noticia>();
    this.noticiasService.getNoticias().subscribe(
      (result)=>{
        Object.assign(this.noticias, result)
      },
      (error)=>{
        console.log(error);
      }
    )
  }



  elegirNoticia(noticia: Noticia){
    //punto.sector = this.sectores.find(element=>element._id == punto.sector._id )
    Object.assign(this.noticia, noticia);

  }

  borrarNoticia(noticia: Noticia){
    this.noticiasService.deleteNoticias(noticia).subscribe(
      (result)=>{
        this._toastr.success("Ha tenido exito", "Exito");
      }, 
      (error)=>{
        console.log(error);
        this._toastr.error("Ha tenido error", "Error");
      }
    );
    this.refrescarNoticias();
  }

  limpiarNoticia(){
    this.noticia = new Noticia();
  }


  modificarNoticia(){
    //actualizo fecha ultima modificación
    

    this.noticiasService.updateNoticia(this.noticia).subscribe(
      (result)=>{
        this._toastr.success("Ha sido modificado con éxito", "Éxito");
        this.noticia = new Noticia();
    this.refrescarNoticias()
      },
      (error)=>{
        console.log(error);
        this._toastr.error("Ha tenido error", "Error");
      }
    );
  
  }
  

  iniciarFb(){
    let initParams: InitParams = {
    appId: '1241323086200790',
    autoLogAppEvents : true,
    xfbml : true,
    version : 'v7.0'
    };
    this.fb.init(initParams);
  }
   
  postFb(){
      var apiMethod: ApiMethod = "post";
      this.fb.api('/115493920230270/feed', apiMethod,
      {
      message: 'FECHA:'+this.noticia.fecha + '\nTITULO:'+ this.noticia.titulo + '\nDESCRIPCION:' + this.noticia.descripcion,
      access_token:"EAARoZBg2av9YBAK4C9fpN9NHgZAMwc5P0ZAPZBNHUCNZAMTzieS6Xy0paHHF9O5w6nZBE9P9EqVXltrthWE46AduC7ynLK2DSFI0GZACkP3A75SXTwrZA3xvIsbVM88mMcqvZC7XPQhbl72iQ7fwM8eq8gMmxVRRI9HQlz7RmfXSR5nL3wEkI4uSn3SZBVtHgKZAuGovNBEvi0ZAdwZDZD"
      });
  }

  limpiarForm(){
    this.noticia = new Noticia();
  }
}

