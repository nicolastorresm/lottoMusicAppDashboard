import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuarios/usuario';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  usuario : Usuario

  miFormulario: FormGroup = this.fb.group({
    email: ['torresmartinezn86@gmail.com',[Validators.required, Validators.email]],
    password: ['lotto123',[Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder,
    private router:Router,
    private authService:AuthService) {

      this.usuario = new Usuario();
     }

 
     login():void{
      console.log(this.miFormulario.value) 
    
      this.usuario = this.miFormulario.value;
      console.log('email',this.usuario.email) 
      console.log('pass',this.usuario.password) 
      
      if (this.usuario.email== null || this.usuario.password == null){
        console.log ('error login',this.usuario)
        return;
      }
    
      this.authService.login(this.usuario)
      .subscribe( resp =>{
        console.log(resp)
    
        //  se uysa ebn la clase servixce, decodifica y luiego se convieerte a jsono let payload = JSON.parse (atob((resp.token.split(".")[1])))
        //console.log(payload)
    
        // guardar dos datos, para mantener la sesion
    
       // this.authService.guardarUsuario( resp.token)
       
       
       //this.authService.guardarToken(resp.token)
    
      // let usuario = this.authService.usuario
    
        this.router.navigateByUrl('/dashboard')
    
        console.log ('Login', `Hola ${resp.user.username}, Has iniciado sesion con exito` )
    //    console.log ('0objet', `Hola ${usuario.email}, Has iniciado sesion con exito....` )
      }, err => {
          if (err.status == 401){
            console.log('usuario o clave incorrecta') 
          }
    
      } )
    
    }
}
