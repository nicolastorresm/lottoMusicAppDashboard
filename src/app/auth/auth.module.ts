import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './pages/register/register-user/register-user.component';



@NgModule({
  declarations: 
  [
      RegisterUserComponent
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
