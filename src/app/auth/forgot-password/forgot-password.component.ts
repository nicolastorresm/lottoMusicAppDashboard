import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [
  ]
})
export class ForgotPasswordComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.email]]
  })

  constructor(private fb:FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {
  }


  onReset(){
    const email = this.miFormulario.value
    console.log('send email')
    this.authService.resetPassword(email)
  }

}



