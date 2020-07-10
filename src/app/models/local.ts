export class Local {
    
    
    _id: string
    superficie: number
    imagen: string
    alquilado: boolean = false
    costoMes: number

    constructor(_id?:string,superficie?:number,imagen?:string,alquilado?:boolean,costoMes?:number){

        this._id = _id;
        this.superficie=superficie;
        this.imagen=imagen;
        this.alquilado = alquilado;
        this.costoMes = costoMes;

    }
}


