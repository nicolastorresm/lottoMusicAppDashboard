import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListadoComponent } from './videos/pages/listado/listado.component';
import { AgregarComponent } from './videos/pages/agregar/agregar.component';
import { VideoComponent } from './videos/pages/video/video.component';
import { AgregarApuestaComponent } from './apuestas/pages/agregar-apuesta/agregar-apuesta.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    children:[

      {path: 'listado',component: ListadoComponent},
      {path: 'agregar',component: AgregarComponent},
      {path: 'agregarapuesta',component: AgregarApuestaComponent},
      { path: ':id',component: VideoComponent},
      {path: 'editar/:id',component: AgregarComponent},
      
      {path: '**', redirectTo:''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
