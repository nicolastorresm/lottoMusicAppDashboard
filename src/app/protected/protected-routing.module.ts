import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListadoComponent } from './videos/pages/listado/listado.component';
import { AgregarComponent } from './videos/pages/agregar/agregar.component';
import { VideoComponent } from './videos/pages/video/video.component';
import { AgregarApuestaComponent } from './apuestas/pages/agregar-apuesta/agregar-apuesta.component';
import { AuthGuard } from './videos/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    children:[

      {path: 'listado',component: ListadoComponent,canActivate:[AuthGuard]},
      {path: 'agregar',component: AgregarComponent, canActivate:[AuthGuard]},
      {path: 'agregarapuesta',component: AgregarApuestaComponent, canActivate:[AuthGuard]},
      { path: ':id',component: VideoComponent,canActivate:[AuthGuard]},
      {path: 'editar/:id',component: AgregarComponent, canActivate:[AuthGuard]},
      
      {path: '**', redirectTo:''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
