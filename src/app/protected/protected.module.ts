import { VideoTarjetaComponent } from './videos/video-tarjeta/video-tarjeta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { AgregarComponent } from './videos/pages/agregar/agregar.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeurlPipe } from './videos/pipe/safeurl.pipe';
import { ListadoComponent } from './videos/pages/listado/listado.component';
import { VideoComponent } from './videos/pages/video/video.component';


@NgModule({
  declarations: [
    AgregarComponent,
    SafeurlPipe,
    ListadoComponent,
    VideoTarjetaComponent,
    VideoComponent

   
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class ProtectedModule { }
