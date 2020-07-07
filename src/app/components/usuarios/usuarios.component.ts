import { Component, OnInit } from '@angular/core';
import { Usuario} from './../../models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: Usuario;
  usuarios: Array<Usuario>;
  
  submited: boolean;


  constructor(private usuarioService: UsuarioService, public loginService:LoginService ) { 
   this.usuario = new Usuario();
   this.usuarios= new Array<Usuario>();

    this.usuario.usuario
    this.refrescarUsuarios();
    

  }

  ngOnInit(): void {
  }

  guardarUsuario(){
  
    if(this.usuario.activo != true){
      this.usuario.activo = false;
    }
    this.usuarioService.addUsuarios(this.usuario).subscribe(
      (result)=>{
        alert("Punto guardado");
      },
      (error)=>{
        console.log(error);
      }
    )

    this.refrescarUsuarios();
    this.usuario = new Usuario();
    console.log(this.usuarios);

  }

  refrescarUsuarios(){
    //this.puntosInteres = this.puntoService.getPuntos();
    this.usuarios = new Array<Usuario>();
    this.usuarioService.getUsuarios().subscribe(
      (result)=>{
        Object.assign(this.usuarios, result)
      },
      (error)=>{
        console.log(error);
      }
    )
  }



  elegirUsuario(usuario: Usuario){
    //punto.sector = this.sectores.find(element=>element._id == punto.sector._id )
    this.usuario = usuario;

  }

  borrarUsuario(usuario: Usuario){
    this.usuarioService.deleteUsuarios(usuario).subscribe(
      (result)=>{
        alert("usuario eliminado");
      }, 
      (error)=>{
        console.log(error);
      }
    );
    this.refrescarUsuarios();
  }

  limpiarUsuario(){
    this.usuario = new Usuario();
  }


  modificarUsuario(){
    //actualizo fecha ultima modificación
    

    this.usuarioService.updateUsuario(this.usuario).subscribe(
      (result)=>{
        alert("usuario actualizado");
      },
      (error)=>{
        console.log(error);
      }
    );
    this.usuario = new Usuario();
    this.refrescarUsuarios()
  }

}