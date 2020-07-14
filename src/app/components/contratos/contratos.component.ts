import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/models/contrato';
import { ContratoService } from 'src/app/services/contrato.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Propietario } from 'src/app/models/propietario';

import { PropietariosService } from 'src/app/services/propietarios.service';
import {Local} from '../../models/local'
import { LocalService } from 'src/app/services/local.service';
import { LocalesComponent } from '../locales/locales.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  contrato: Contrato;
  contratos: Array<Contrato>;
  propietarios :Array<Propietario>;
  propietario: Propietario;
  local : Local;
  locales: Array<Local>;



  constructor(private contratoService: ContratoService, private _toastr:ToastrService, public loginService: LoginService, 
    private propietarioService: PropietariosService, private localesService:LocalService) {

      this.contrato = new Contrato();
      this.propietarios = new Array<Propietario>();
      this.contratos = new Array<Contrato>();
      this.locales = new Array<Local>();
      this.propietario = new Propietario();
      this.local = new Local();

      
      this.refrescarContrato();
      this.refrescarPropietarios();
      this.refrescarLocales();
     }

  ngOnInit(): void {
  }

  
  
  
  mensajeInformacion(){
  
    this._toastr.info("Ha tenido información", "Información");
  }


  refrescarPropietarios(){
    //this.puntosInteres = this.puntoService.getPuntos();
    
    this.propietarioService.getPropietarios().subscribe(
      (result)=>{
        Object.assign(this.propietarios, result)
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  refrescarLocales(){
    //this.puntosInteres = this.puntoService.getPuntos();
    this.locales = new Array<Local>();
    this.localesService.getLocales().subscribe(
      (result)=>{
        Object.assign(this.locales, result)
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  

  guardarcontrato(){
  
    this.contratoService.addContrato(this.contrato).subscribe(
      (result)=>{
        this.refrescarContrato();
    this.contrato = new Contrato();
    this._toastr.success("Ha tenido exito", "Exito");
      },
      (error)=>{
        this._toastr.error("Ha tenido error", "Error");
        console.log(error);
      }
    )

    
    console.log(this.contrato);

  }

  refrescarContrato(){
    //this.puntosInteres = this.puntoService.getPuntos();
    this.contratos = new Array<Contrato>();
    this.contratoService.getContratos().subscribe(
      (result)=>{
        Object.assign(this.contratos, result)
      },
      (error)=>{
        console.log(error);
      }
    )
  }



  elegircontrato(contrato: Contrato){
    //punto.sector = this.sectores.find(element=>element._id == punto.sector._id )
    
    Object.assign(this.contrato = contrato);

  }

  borrarcontrato(contrato: Contrato){
    this.contratoService.deleteContrato(contrato).subscribe(
      (result)=>{
        alert("contrato eliminado");
        this.refrescarContrato();
      }, 
      (error)=>{
        console.log(error);
      }
    );
    
  }

  limpiarcontrato(){
    this.contrato = new Contrato();
  }


  modificarcontrato(){
    //actualizo fecha ultima modificación
    

    this.contratoService.updateContrato(this.contrato).subscribe(
      (result)=>{
        alert("contrato actualizado");
        this.contrato = new Contrato();
        this.refrescarContrato()
      },
      (error)=>{
        console.log(error);
      }
    );
    
  }

}
