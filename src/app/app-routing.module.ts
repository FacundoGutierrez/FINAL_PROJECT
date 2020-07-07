import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent} from './components/usuarios/usuarios.component';
import {LoginComponent} from './components/login/login.component';
import { NovedadesComponent } from './components/novedades/novedades.component'
import { from } from 'rxjs';


const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'novedades', component: NovedadesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
