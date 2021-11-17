import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: 
  [
  
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,

      ReactiveFormsModule
  ],
  exports:[

  ]
})
export class AuthModule { }
