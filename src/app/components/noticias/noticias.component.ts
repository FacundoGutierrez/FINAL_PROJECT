import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import { LoginService } from 'src/app/services/login.service';
import { FacebookService, InitParams, LoginResponse } from 'ngx-fb';
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';
import { Usuario } from 'src/app/models/usuario';

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
  
  
  constructor(private noticiasService:NoticiaService, public loginService:LoginService, private fb: FacebookService) {
     this.noticias = new Array<Noticia>();
     this.noticia = new Noticia();
     this.usuario = new Usuario();
     this.usuarios = new Array<Usuario>();
     this.cargarNoticias();
   }

  ngOnInit(): void {
  }

  public cargarNoticias(){
    this.noticias = new Array<Noticia>();
    this.noticiasService.getNoticias().subscribe(
      (result)=>{
        var not: Noticia = new Noticia();
        result.forEach(element => {
          Object.assign(not, element);
          if(not.vigente == true){
            this.noticias.push(not);
          }
          not = new Noticia();
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  guardarNoticia(){
    this.noticiasService.addNoticias(this.noticia).subscribe(
      (result)=>{
        alert("Noticia guardado");
        this.refrescarNoticias();
        this.noticia = new Noticia();
      },
      (error)=>{
        console.log(error);
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
    this.noticia = noticia;

  }

  borrarNoticia(noticia: Noticia){
    this.noticiasService.deleteNoticias(noticia).subscribe(
      (result)=>{
        alert("Noticia eliminado");
      }, 
      (error)=>{
        console.log(error);
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
        alert("Noticia actualizado");
      },
      (error)=>{
        console.log(error);
      }
    );
    this.noticia = new Noticia();
    this.refrescarNoticias()
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
      message: 'mensaje:'+this.noticia.descripcion,
      access_token:"EAARoZBg2av9YBAONRyRNSMekms9S7P8tVF9vwbXUf25O3rxsoJTD9QZC24Dst99el8OjW4BWIxReDIhxyNZB4E8vRTA80SWVj5xxLSC8VZApZCt9tLxE0ZCLClZAw7mZAAx29d6SEHkzSoCeLreMynqb1VHzfJigpffPMxQHCsrL5o4jhEfygZAreZC4vlxB29UDZAJQbE8McAZA8QZDZD"
      });
  }

  limpiarForm(){
    this.noticia = new Noticia();
  }
}

