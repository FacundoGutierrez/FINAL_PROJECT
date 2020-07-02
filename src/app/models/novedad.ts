import { Usuario } from './usuario'

export class Novedad {

    id: number
    usuario: Usuario
    texto: string
    estado: string 

    constructor(id?:number, usuario?:Usuario, texto?:string, estado?:string)
    {
        this.id=id;
        this.usuario= usuario;
        this.texto= texto;
        this.estado=estado;

    }
}
