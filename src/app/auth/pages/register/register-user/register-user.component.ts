import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidacioService } from '../../../../services/validacio.service';
import { EmailValidatorService } from '../../../../services/email-validator.service';
import { AuthService } from '../../../services/auth.service';
import { IUsuario } from 'src/app/auth/interfaces/IUsuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styles: [
  ]
})
export class RegisterUserComponent implements OnInit {

  usuario : IUsuario = {
    nombre            : '',
    apellidop         : '',
    apellidom         : '',
    fechaNacimiento  : '',
    telefono    : '',
    email          :'',
    password          : ''
   }

  //ExpresionRegular
 /*  nombrePattern:string = '([a-zA-Z]+)'
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"; */

  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required,Validators.pattern(this.validacioService.nombrePattern), Validators.minLength(3)]],
    apellidop: ['',[Validators.required,Validators.pattern(this.validacioService.nombrePattern), Validators.minLength(3)]],
    apellidom: ['',[Validators.required,Validators.pattern(this.validacioService.nombrePattern), Validators.minLength(3)]],
    fechaNacimiento: ['',[Validators.required]],
    telefono: ['',[Validators.required, Validators.pattern(this.validacioService.telefonoPattern), Validators.minLength(10),Validators.maxLength(10)]],
    email: ['',[Validators.required,Validators.pattern(this.validacioService.emailPattern)], [this.emailValidator]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2:['',[Validators.required,Validators.minLength(6)]]

  },{
    validators:[this.validacioService.camposIguales('password','password2')]
  })

  constructor(private fb:FormBuilder,
      private validacioService:ValidacioService,
    private emailValidator:EmailValidatorService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }


  crearNuevoUsuario(){
    console.log(this.miFormulario.value);

    this.usuario = this.miFormulario.value
    
    console.log("fecha recibida", this.miFormulario.value.fechaNacimiento)
    this.authService.agregarUsuario(this.usuario)    
.subscribe( video => Swal.fire('Registro exitoso',`Ahora, puedes iniciar sesión`,'success')

)
this.router.navigateByUrl('/login')


    this.miFormulario.markAllAsTouched();
  }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched;
  }

  campoNoValidoTelefono(campo:number){
    return this.miFormulario.get(campo.toString())?.invalid
      && this.miFormulario.get(campo.toString())?.touched;
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.required) {
      return 'el Email es obligatorio'
    }else if (errors?.pattern){
      return 'el valor debe tener el formato correcto'
    }else if (errors?.emailTomado) {
      return 'El email ya esta registrado'
    }

    return '';
  }

  /* emailRequired(){
    return this.miFormulario.get('email')?.errors?.required
        && this.miFormulario.get('email')?.touched;
  }

  emailFormato(){
    return this.miFormulario.get('email')?.errors?.pattern
        && this.miFormulario.get('email')?.touched;
  }

  emailTomado(){
    return this.miFormulario.get('email')?.errors?.emailTomado
        && this.miFormulario.get('email')?.touched;
  } */

}
