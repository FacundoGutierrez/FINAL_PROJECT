import { Propietario } from './propietario'
import { Local } from './local'

export class Contrato {

        _id: number
        fecha: Date
        propietario: Propietario
        locales: Array<Local>
        costoTotalAlq: number

        constructor(_id?:number,fecha?:Date,propietario?:Propietario, locales?:Array<Local>,costoTotalAlq?:number){
            this._id = _id;
            this.fecha = fecha;
            this.propietario = propietario;
            this.locales = locales;
            this.costoTotalAlq = costoTotalAlq;
            

        }
}
