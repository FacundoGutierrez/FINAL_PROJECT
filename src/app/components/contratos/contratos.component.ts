import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/models/contrato';
import { ContratoService } from 'src/app/services/contrato.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  contrato: Contrato;
  contratos: Array<Contrato>;

  constructor(private contratoService: ContratoService, private _toastr:ToastrService) { }

  ngOnInit(): void {
  }
  mensajeExito(){

    this._toastr.success("Ha tenido exito", "Exito");
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



  guardarcontrato(){
  
    this.contratoService.addContrato(this.contrato).subscribe(
      (result)=>{
        alert("Punto guardado");
      },
      (error)=>{
        console.log(error);
      }
    )

    this.refrescarContrato();
    this.contrato = new Contrato();
    console.log(this.contrato);

  }

  refrescarContrato(){
    //this.puntosInteres = this.puntoService.getPuntos();
    this.contratos = new Array<Contrato>();
    this.contratoService.getContratos().subscribe(
      (result)=>{
        Object.assign(this.contrato, result)
      },
      (error)=>{
        console.log(error);
      }
    )
  }



  elegircontrato(contrato: Contrato){
    //punto.sector = this.sectores.find(element=>element._id == punto.sector._id )
    this.contrato = contrato;

  }

  borrarcontrato(contrato: Contrato){
    this.contratoService.deleteContrato(contrato).subscribe(
      (result)=>{
        alert("contrato eliminado");
      }, 
      (error)=>{
        console.log(error);
      }
    );
    this.refrescarContrato();
  }

  limpiarcontrato(){
    this.contrato = new Contrato();
  }


  modificarcontrato(){
    //actualizo fecha ultima modificación
    

    this.contratoService.updateContrato(this.contrato).subscribe(
      (result)=>{
        alert("contrato actualizado");
      },
      (error)=>{
        console.log(error);
      }
    );
    this.contrato = new Contrato();
    this.refrescarContrato()
  }

}
