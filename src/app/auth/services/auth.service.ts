import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/usuarios/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl

  private _usuario: Usuario;
  private _token: string;

  constructor(private _http : HttpClient) { }

  login(usuario: Usuario):Observable<any>{
    const urlEndpoint = `${this.baseUrl}/login`
    //const credenciales =btoa ('angularapp'+ ':'+'12345')
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}); //+creden
    let params = new URLSearchParams();
  //params.set('grant_type','password')
    params.set('username', usuario.email)
    params.set('password', usuario.password)
    console.log(params.toString())

    return this._http.post<any>(urlEndpoint,params.toString(),{headers: httpHeaders}) 

  }
}

