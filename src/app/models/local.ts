export class Local {
    
    
    id: number
    superficie: number
    imagen: string
    alquilado: boolean
    costoMes: number

    constructor(id?:number,superficie?:number,imagen?:string,alquilado?:boolean,costoMes?:number){

        this.id = id;
        this.superficie=superficie;
        this.imagen=imagen;
        this.alquilado = alquilado;
        this.costoMes = costoMes;

    }
}


