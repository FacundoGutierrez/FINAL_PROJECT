import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import { Local } from '../../models/local';
import { LoginService } from 'src/app/services/login.service';
import * as printJS from 'print-js'
import jsPDF from 'jspdf'
import * as $ from 'jquery'
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {

  
  local:Local;
  locales:Array<Local>;
  tamMaxText : number = 20;
  tamText :number;

  constructor(private localService: LocalService, public loginServices: LoginService, private _toastr: ToastrService) { 
    this.locales = new Array<Local>();
    this.local = new Local();

    this.refrescarLocales();
  }

  ngOnInit(): void {
  }

  
  mensajeError(){
  
    this._toastr.error("Ha tenido error", "Error");
  }
  
  mensajeInformacion(){
  
    this._toastr.info("Ha tenido información", "Información");
  }
  
  mensajeAdvertencia(){
  
    this._toastr.warning("Ha tenido advertencia", "Advertencia"); 
  }


  cambiarTamTexto(){
    this.tamText = this.local.descripcion.length;
    console.log(this.tamText)
  } 

  public generarpdf(){
    var doc = new jsPDF();
    doc.text("mi pdf", 10, 10)
    doc.frontHTML($('#tabla').get(0) ,15, 15 )
    doc.save('table pdf')
  }


   public Print(){

    JSON.stringify(this.locales); 
    printJS({ printable: this.locales, properties:['superficie', 'alquilado','costoMes'],type: 'json' })

  }


  public cambioImg(files, b: string){
    if (files != null)
    {
      if (b === 'localnuevo')
      {
        this.local.imagen = files[0].base64;
      }
      else{
        this.local.imagen = files[0].base64;
      }
    }
  }

  
  guardarLocal(){
  
    if(this.local.alquilado != true){
      this.local.alquilado = false;
    }
    this.localService.addLocales(this.local).subscribe(
      (result)=>{
        alert("Local guardado");
        this.refrescarLocales();
        this.local = new Local();
        this._toastr.success("Ha tenido exito", "Exito");
      },
      (error)=>{
        console.log(error);
      }
    )

   
   

  }

  refrescarLocales(){
    //this.puntosInteres = this.puntoService.getPuntos();
    this.locales = new Array<Local>();
    this.localService.getLocales().subscribe(
      (result)=>{
        Object.assign(this.locales, result)
      },
      (error)=>{
        console.log(error);
      }
    )
  }



  elegirlocal(local: Local){
    //punto.sector = this.sectores.find(element=>element._id == punto.sector._id )
    
    Object.assign(this.local, local);

  }

  borrarlocal(local: Local){
    this.localService.deleteLocales(local).subscribe(
      (result)=>{
        alert("local eliminado");
      }, 
      (error)=>{
        console.log(error);
      }
    );
    this.refrescarLocales();
  }

  limpiarlocal(){
    this.local = new Local();
  }


  modificarlocal(){
    //actualizo fecha ultima modificación
    this.localService.updateLocal(this.local).subscribe(
      (result)=>{
        alert("local actualizado");
        this.local = new Local();
        this.refrescarLocales()
      },
      (error)=>{
        console.log(error);
      }
    );

  }

}
