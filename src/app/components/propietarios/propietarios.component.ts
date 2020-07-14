import { Component, OnInit } from '@angular/core';
import { PropietariosService } from 'src/app/services/propietarios.service';
import { Propietario } from 'src/app/models/propietario';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.css']
})
export class PropietariosComponent implements OnInit {

  propietario: Propietario;
  propietarios: Array<Propietario>;
  

  constructor(private propietarioService:PropietariosService, public loginService: LoginService, private _toastr: ToastrService) {

    this.propietarios = new Array<Propietario>();
    this.propietario = new Propietario();

    this.refrescarPropietarios();

   }

  ngOnInit(): void {
  }




  guardarPropietario(){
  
    
    
    this.propietarioService.addPropietario(this.propietario).subscribe(
      (result)=>{
        this._toastr.success("Ha tenido éxito", "Éxito");
        this.refrescarPropietarios();
        this.propietario = new Propietario();
      },
      (error)=>{
        console.log(error);
        this._toastr.error("Ha tenido error", "Error");
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
        this._toastr.success("Ha borrado éxito", "Éxito");
      }, 
      (error)=>{
        console.log(error);
        this._toastr.error("Ha tenido error", "Error");
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
        this._toastr.success("Ha actualizado con éxito", "Éxito");
      },
      (error)=>{
        console.log(error);
        this._toastr.error("Ha tenido error", "Error");
      }
    );
    this.propietario = new Propietario();
    this.refrescarPropietarios()
  }

}