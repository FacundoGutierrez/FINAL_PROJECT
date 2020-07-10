import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticia: Noticia;
  noticias: Array<Noticia>;
  
  
  constructor(private noticiasService:NoticiaService, public loginService:LoginService) {
     this.noticias = new Array<Noticia>();
     this.noticia = new Noticia();
   }

  ngOnInit(): void {
  }
  guardarNoticia(){
  
    this.noticiasService.addNoticias(this.noticia).subscribe(
      (result)=>{
        alert("Punto guardado");
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

}

