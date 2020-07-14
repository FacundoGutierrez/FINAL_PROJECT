import { Component, OnInit } from '@angular/core';
import { Novedad } from '../../models/novedad';
import { NovedadService } from 'src/app/services/novedad.service';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  
  usuario: Usuario;

  novedad : Novedad;
  novedades: Array<Novedad>;
  submited: boolean;
  tamMaxText : number = 20;
  tamText :number;


  constructor(private novedadService: NovedadService, public loginService: LoginService, private _toastr: ToastrService) { 
    this.novedad = new Novedad();
    this.refrescarNovedades();
  }

  ngOnInit(): void {
  }
  
  cambiarTamTexto(){
    this.tamText = this.novedad.texto.length;
    console.log(this.tamText)
  } 


  limpiarMensaje(){
    this.tamText = 0;
  }

  guardarNovedad(){
    this.novedad.usuarios = this.loginService.userLogged;
    this.novedad.estado = "pendiente";
    this.novedadService.addNovedad(this.novedad).subscribe(
      (result)=>{
        this._toastr.success("Ha tenido éxito", "Éxito");
        this.refrescarNovedades();
        this.novedad = new Novedad();
      },
      (error)=>{
        console.log(error);
        this._toastr.error("Ha tenido error", "Error");
      }
    )
    console.log(this.novedades);
  }

  refrescarNovedades(){
    //this.puntosInteres = this.puntoService.getPuntos();
    this.novedades = new Array<Novedad>();
    this.novedadService.getNovedades().subscribe(
      (result)=>{
        let r = new Novedad();
        for(let i in result)
        {
          Object.assign(r, result[i])
          if(r.usuarios != null)
          {
            this.novedades.push(r);
          }
          r = new Novedad();
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }



  elegirNovedad(novedad: Novedad){
    //punto.sector = this.sectores.find(element=>element._id == punto.sector._id )
    this.novedad = novedad;
  }

  borrarNovedad(novedad: Novedad){
    this.novedadService.deleteNovedad(novedad).subscribe(
      (result)=>{
        this._toastr.success("Ha borrado éxito", "Éxito");
      }, 
      (error)=>{
        console.log(error);
        this._toastr.error("Ha tenido error", "Error");
      }
    );
    this.refrescarNovedades();
  }

  limpiarNovedad(){
    this.novedad = new Novedad();
  }


  modificarNovedad(b:Novedad){
    //actualizo fecha ultima modificación
    this.novedad = b;
    this.novedad.estado = 'procesado';
    this.novedadService.updateNovedad(this.novedad).subscribe(
      (result)=>{
        this._toastr.success("Ha modificado éxito", "Éxito");
        this.novedad = new Novedad();
        this.refrescarNovedades()
      },
      (error)=>{
        console.log(error);
        this._toastr.error("Ha tenido error", "Error");
      }
    );
 
  }
}

