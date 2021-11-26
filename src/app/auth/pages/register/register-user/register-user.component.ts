import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidacioService } from '../../../../services/validacio.service';
import { EmailValidatorService } from '../../../../services/email-validator.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styles: [
  ]
})
export class RegisterUserComponent implements OnInit {

  //ExpresionRegular
 /*  nombrePattern:string = '([a-zA-Z]+)'
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"; */

  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required,Validators.pattern(this.validacioService.nombrePattern), Validators.minLength(3)]],
    email: ['',[Validators.required,Validators.pattern(this.validacioService.emailPattern)], [this.emailValidator]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2:['',[Validators.required,Validators.minLength(6)]]

  },{
    validators:[this.validacioService.camposIguales('password','password2')]
  })

  constructor(private fb:FormBuilder,
      private validacioService:ValidacioService,
    private emailValidator:EmailValidatorService) { }

  ngOnInit(): void {
  }


  crearNuevoUsuario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched;
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
