export class Local {
    
    
    _id: string
    superficie: number
    imagen: string
    alquilado: boolean = false
    costoMes: number
    descripcion: string

    constructor(_id?:string,superficie?:number,imagen?:string,alquilado?:boolean,costoMes?:number,descripcion?:string){

        this._id = _id;
        this.superficie=superficie;
        this.imagen=imagen;
        this.alquilado = alquilado;
        this.costoMes = costoMes;
        this.descripcion = descripcion;
    }
}


