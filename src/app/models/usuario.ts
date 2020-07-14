export class Usuario {
    _id: string
usuario: string //email
password: string
activo: boolean = false
perfil: string
 constructor(_id?:string, usuario?:string, password?:string, activo?: boolean, perfil?:string){

    this._id =_id;
    this.password = password;
    this.activo = activo;
    this.usuario = usuario;
    this.perfil = "perfil";
 }
}
