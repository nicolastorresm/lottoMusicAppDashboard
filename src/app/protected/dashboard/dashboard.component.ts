import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {



  constructor(private authservice:AuthService, private router:Router) {
    
   }

    usuario:string = this.authservice.usuario.email;
    
    logout():void{
      let email = this.authservice.usuario.email
      this.authservice.logout();
      Swal.fire('Logout',`Hola ${email}, has cerrado sesión con éxito!`,'success')
      this.router.navigate(['/login'])
    
    }



  ngOnInit(): void {
  }


}
