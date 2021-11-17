import { Component, OnInit } from '@angular/core';
import { IVideo } from '../../interfaces/video.interface';
import { VideosService } from '../../services/videos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
 `mat-card{
  margin-top: 20px;
  }`
  ]
})
export class ListadoComponent implements OnInit {

  videos : IVideo [] =[]

  constructor(private videosService:VideosService) { }

  ngOnInit(): void {

    this.videosService.getVideos()
    .subscribe(videos => this.videos = videos )
  } 

}
