import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IApuesta } from '../interfaces/apuesta.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApuestaService {
  private baseUrl: string = environment.baseUrl

  constructor(private httpClient:HttpClient) { }

  agregarVideoApuesta (apuesta:IApuesta ){
    console.log("estamos en service: agregarVideoApuesta")
    
    console.log(apuesta)
        return this.httpClient.post<IApuesta>(`${this.baseUrl}/apuesta`,apuesta)
  }

  getApuestaPorId(id: number):Observable<IApuesta>{
    return this.httpClient.get<IApuesta>(`${this.baseUrl}/video/${id}`)
}
}
