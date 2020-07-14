import { Component, OnInit } from '@angular/core';
import { Usuario} from './../../models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/login.service';
import { PropietariosService } from 'src/app/services/propietarios.service';
import { Propietario } from 'src/app/models/propietario';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: Usuario;
  usuario1: Usuario;
  usuarios: Array<Usuario>;

  submited: boolean;
  propietario: Propietario;
  propietarios: Array<Propietario>;
  emails: Array<any>;



  constructor(private usuarioService: UsuarioService, public loginService:LoginService, private propietarioService:PropietariosService, private _toastr: ToastrService) { 
   this.usuario = new Usuario();
   this.usuarios= new Array<Usuario>();
    this.usuario1= new Usuario();
    
    this.refrescarUsuarios();
    

  }

  ngOnInit(): void {
  }

  public cargarPropietarios(){
    var email: string;
    this.propietarioService.getPropietarios().subscribe(
      (result)=>{
        var afi: Propietario = new Propietario();
        result.forEach(element => {
          Object.assign(afi, element);
          this.emails.push(afi.email);
          console.log(this.emails.toString())
          afi = new Propietario();
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }












  guardarUsuario(){
  
    if(this.usuario.activo != true){
      this.usuario.activo = false;
    }
    this.usuarioService.addUsuarios(this.usuario).subscribe(
      (result)=>{
        this._toastr.success("Ha tenido éxito", "Éxito");
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
        this._toastr.success("Ha borrado con éxito", "Éxito");
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
        this._toastr.success("Ha actualizado con éxito", "Éxito");
      },
      (error)=>{
        console.log(error);
      }
    );
    this.usuario = new Usuario();
    this.refrescarUsuarios()
  }

}