import { Component, OnInit } from '@angular/core';
import { IVideo } from '../../interfaces/video.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { VideosService } from '../../services/videos.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styles: [
  ]
})
export class VideoComponent implements OnInit {
  video !: IVideo;

  constructor(private activatedRoute:ActivatedRoute,
    private videoService:VideosService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe (
      switchMap ( ({id}) => this.videoService.getVideosPorId(id))
    ).subscribe (video => this.video = video)
  }


  
  regresar() {
    this.router.navigate(['/videos/listado'])
  }

}
