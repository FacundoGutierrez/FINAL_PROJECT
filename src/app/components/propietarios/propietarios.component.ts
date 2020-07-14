import { Component, OnInit } from '@angular/core';
import { PropietariosService } from 'src/app/services/propietarios.service';
import { Propietario } from 'src/app/models/propietario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.css']
})
export class PropietariosComponent implements OnInit {

  propietario: Propietario;
  propietarios: Array<Propietario>;
  

  constructor(private propietarioService:PropietariosService, public loginService: LoginService) {

    this.propietarios = new Array<Propietario>();
    this.propietario = new Propietario();

    this.refrescarPropietarios();

   }

  ngOnInit(): void {
  }




  guardarPropietario(){
  
    
    
    this.propietarioService.addPropietario(this.propietario).subscribe(
      (result)=>{
        alert("Punto guardado");
        this.refrescarPropietarios();
        this.propietario = new Propietario();
      },
      (error)=>{
        console.log(error);
      }
    )

  
    console.log(this.propietarios);

  }

  refrescarPropietarios(){
    //this.puntosInteres = this.puntoService.getPuntos();
    this.propietarios = new Array<Propietario>();
    this.propietarioService.getPropietarios().subscribe(
      (result)=>{
        Object.assign(this.propietarios, result)
      },
      (error)=>{
        console.log(error);
      }
    )
  }



  elegirPropietario(propietario: Propietario){
    //punto.sector = this.sectores.find(element=>element._id == punto.sector._id )
    this.propietario = propietario;

  }

  borrarPropietario(propietario: Propietario){
    this.propietarioService.deletePropietario(propietario).subscribe(
      (result)=>{
        alert("propietario eliminado");
      }, 
      (error)=>{
        console.log(error);
      }
    );
    this.refrescarPropietarios();
  }

  limpiarPropietario(){
    this.propietario = new Propietario();
  }


  modificarPropietario(){
    //actualizo fecha ultima modificación
    

    this.propietarioService.updatePropietario(this.propietario).subscribe(
      (result)=>{
        alert("propietario actualizado");
      },
      (error)=>{
        console.log(error);
      }
    );
    this.propietario = new Propietario();
    this.refrescarPropietarios()
  }

}