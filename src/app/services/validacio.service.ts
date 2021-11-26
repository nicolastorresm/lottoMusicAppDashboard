import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacioService {

  public nombrePattern:string = '([a-zA-Z]+)'
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  camposIguales(campo1: string, campo2:string) {
    return (formGroup: AbstractControl) : ValidationErrors | null=> {
     
     console.log(formGroup)

     const pass1 = formGroup.get(campo1)?.value;
     const pass2 = formGroup.get(campo2)?.value;

     if(pass1 !== pass2){
       formGroup.get(campo2)?.setErrors({noIguales: true})
       return {noIguales: true}
     }
     
     formGroup.get(campo2)?.setErrors(null)
      return null
    }
  }
}
