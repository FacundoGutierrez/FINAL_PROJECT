import { Usuario } from './usuario'

export class Novedad {

    _id: number
    usuarios: Usuario
    texto: string
    estado: string 

 
    constructor(){
        this.usuarios = new Usuario();

    }
}
