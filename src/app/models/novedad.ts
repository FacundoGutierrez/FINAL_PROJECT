import { Usuario } from './usuario'

export class Novedad {

    _id: string
    usuarios: Usuario
    texto: string
    estado: string 

 
    constructor(){
        this.usuarios = new Usuario();

    }
}
