import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuarios/usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit{

  ngOnInit(){
    if(this.authService.isAuthenticated()){
      Swal.fire('Login', `Hola ${this.authService.usuario.email}  ya estas autenticado`,'info')
      this.router.navigate(['/dashboard'])
    }
  }

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
        console.log ('Error Login','Email o contraseña vacías!','error!')
        return;
      }
    
      this.authService.login(this.usuario)
      .subscribe( resp =>{
        console.log(resp)   
        // // formatear el token https://jwt.io/ y tomar el indice 1 = PAYLOAD:DATA
       // console.log(resp.token.split(".")[1])
      
       //decoficar el string q esta en base 64 y encriptado y convertirlo en datos q nos interesa  con atob
     
        //   console.log(atob(resp.token.split(".")[1]))
        
        //parsearlo y convertirlo a un json
      //  let payload = JSON.parse(atob(resp.token.split(".")[1]))
      

        this.authService.guardarUsuario(resp.token);
        this.authService.guardarToken(resp.token);

        //invocamos el getter usuario, se utiliza como si fuera un atributo getUsuarop
        let usuario = this.authService.usuario

        this.router.navigateByUrl('/dashboard')
        Swal.fire('Login',`Hola ${usuario.email}, Has iniciado sesion con exito....`,'success')
    
       // console.log ('Login', `Hola ${resp.user.username}, Has iniciado sesion con exito` )
    //    console.log ('0objet', `Hola ${usuario.email}, Has iniciado sesion con exito....` )
      }, err => {
          if (err.status == 401){
            Swal.fire('Error Login',` Usuario o Contraseña Incorrecta!`,'error')
          }
    
      } )
    
    }
}
