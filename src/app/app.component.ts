import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinalProject-FRONT';



constructor(private _toastr:ToastrService){}

mensajeExito(){

  this._toastr.success("Ha tenido exito", "Exito");
 
}
mensajeError(){

  this._toastr.error("Ha tenido error", "Error");
}

mensajeInformacion(){

  this._toastr.info("Ha tenido información", "Información");
}

mensajeAdvertencia(){

  this._toastr.warning("Ha tenido advertencia", "Advertencia"); 
}
}