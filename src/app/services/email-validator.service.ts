import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

 
  constructor(private httpCliente:HttpClient) { }

  private baseUrl: string = environment.baseUrl


  validate(control: AbstractControl):  Observable<ValidationErrors  | null>{
const email = control.value;
console.log(email)
    return this.httpCliente.get<any[]>(`${this.baseUrl}/usuarios/email/${email}`)
    .pipe(
      delay(3000),
      map(resp => {
        return (resp.length === 0) //si no regresa nada al consultar el email, se puede ocupar
          ? null
          : {emailTomado:true}
      })
    )
  }
}
