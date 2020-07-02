import { Usuario } from './usuario'

export class Noticia {


        _id: string
        titulo: string
        descripcion: string
        fecha: Date
        usuario: Usuario
        vigente: Boolean

        constructor(_id?:string, titulo?:string, descripcion?:string, fecha?: Date, usuario?: Usuario, vigente?:Boolean){

            this._id = _id;
            this.descripcion = descripcion;
            this.fecha = fecha;
            this.titulo = titulo;
            this.usuario = usuario;
            this.vigente = vigente;

        }
}
