import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IVideo } from '../interfaces/video.interface';



@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private httpClient : HttpClient) { }
  private baseUrl: string = environment.baseUrl;

  //Obtener listado de todo los videos
  getVideos():Observable<IVideo[]>{
   console.log("estamos en getVideos")
    return this.httpClient.get<IVideo[]>(`${this.baseUrl}/video`)
  }

  getVideosPorIdVideo(idVideo: string): Observable<IVideo> {
    return this.httpClient.get<IVideo>(`${this.baseUrl}/video/idvideo/${idVideo}`);
  }

  getVideosPorId(id: number): Observable<IVideo> {
    return this.httpClient.get<IVideo>(`${this.baseUrl}/video/video/${id}`);
  }

  agregarVideo(video:IVideo):Observable<IVideo>{
    console.log("estamos en videoservice agregarVideo")
    
    return this.httpClient.post<IVideo>(`${this.baseUrl}/video`,video)
  
    }

    actualizarVideo(video:IVideo):Observable<IVideo>{
      console.log("estamos enm actualizarVideo ",`${this.baseUrl}/video/${video.id}` )

      return this.httpClient.put<IVideo>(`${this.baseUrl}/video/${video.id}`,video)
    
      } 

}
