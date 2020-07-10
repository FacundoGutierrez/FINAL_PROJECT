import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { LocalesComponent } from './components/locales/locales.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'noticias', component: NoticiasComponent },
  { path: 'locales', component: LocalesComponent },
  { path: 'novedades', component: NovedadesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
