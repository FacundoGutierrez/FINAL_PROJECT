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
import * as printJS from 'print-js';

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
    this.localesService.getLocaleAlq().subscribe(
      (result)=>{
        Object.assign(this.locales, result)
        console.log(this.locales)
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
    Object.assign(this.contrato, contrato);
    this.contrato.propietario = this.propietarios.find((item:Propietario)=>contrato.propietario._id === item._id) 
    
  }

  borrarcontrato(contrato: Contrato){
    this.contratoService.deleteContrato(contrato).subscribe(
      (result)=>{
        this._toastr.success("Ha sido eliminado con exito", "Exito");
        this.refrescarContrato();
        let a = new Local();
        for(let i in contrato.locales)
        {
          Object.assign(a, contrato.locales[i])
          a.alquilado = false;
          this.localesService.updateLocal(a).subscribe();
        }
        this.refrescarLocales();
      }, 
      (error)=>{
        console.log(error);
        this._toastr.error("Ha tenido error", "Error");
      }
    );
    
  }

  limpiarcontrato(){
    this.contrato = new Contrato();
  }
  public Print()
  {

    
      JSON.stringify(this.contratos); 
      printJS({ printable: this.contratos, properties:['propietario.apellido','costoTotalAlq', 'fecha'],type: 'json' })
    }
 

  







  modificarcontrato(){
    //actualizo fecha ultima modificación
    this.contratoService.updateContrato(this.contrato).subscribe(
      (result)=>{
        this._toastr.success("Ha sido modificado con exito", "Exito");
        this.contrato = new Contrato();
        this.refrescarContrato()
      },
      (error)=>{
        console.log(error);
        this._toastr.error("Ha tenido error", "Error");
      }
    );
    
  }
  guardarLocal(){
    
    this.local = this.local[0];

    if(this.contrato.locales == null){
    this.contrato.locales = new Array<Local>();
    }
    this.contrato.costoTotalAlq = this.contrato.costoTotalAlq + this.local.costoMes;
    this.local.alquilado = true;
    this.localesService.updateLocal(this.local).subscribe();
    this.contrato.locales.push(this.local)
    this.local = new Local();
    this.refrescarLocales();
    
   
   

  }




}
