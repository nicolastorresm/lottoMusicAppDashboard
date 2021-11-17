import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

/**
 *Servicios para obtener videos desde la API de youtube.
 * 
 */

 private urlSearch: string ="https://www.googleapis.com/youtube/v3";
 private apiKey: string ="AIzaSyBj6Wf_9Bx_mjiP1jHtpIHR_O0TTfjTn40";

  constructor(private httpClient: HttpClient) { }

  getVideoYoutubeForId(idVideo : string){
    console.log("youtubeService -> getVideoYoutube: el idVideo recibido es " + idVideo);
    const parametros = new HttpParams().set('part', 'snippet').set('q', idVideo).set('maxResult', '10').set('key', this.apiKey);
    let urlBusqueda = `${this.urlSearch}/search`
    return this.httpClient.get (urlBusqueda, {params: parametros})
    .pipe(map(resp => resp ));
  }

}
