import { Propietario } from './propietario'
import { Local } from './local'

export class Contrato {

        id: number
        fecha: Date
        propietario: Propietario
        locales: Array<Local>
        costoTotalAlq: number

        constructor(id?:number,fecha?:Date,propietario?:Propietario, locales?:Array<Local>,costoTotalAlq?:number){
            this.id = id;
            this.fecha = fecha;
            this.propietario = propietario;
            this.locales = locales;
            this.costoTotalAlq = costoTotalAlq;
            

        }
}
