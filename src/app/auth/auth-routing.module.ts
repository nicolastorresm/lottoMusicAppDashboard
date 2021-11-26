import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterUserComponent } from './pages/register/register-user/register-user.component';

import { AuthGuard } from '../protected/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children: [
      {path: 'login',component: LoginComponent},
     {path:'registrouser', component: RegisterUserComponent,canActivate:[AuthGuard]},
    
      {path:'**', redirectTo: 'login'},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
