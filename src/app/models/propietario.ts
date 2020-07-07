export class Propietario {
    _id: number
    apellido: string
    nombres: string
    dni: number
    email: string
    teléfono: number

    constructor(_id?:number, apellido?:string, nombres?:string, dni?:number, email?:string,telefono?:number){


        this._id= _id;
        this.apellido = apellido;
        this.nombres= nombres;
        this.dni = dni;
        this.email = email;
        this.teléfono = telefono;


    }

}

