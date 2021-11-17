import { Component, Input, OnInit } from '@angular/core';
import { IVideo } from '../interfaces/video.interface';



@Component({
  selector: 'app-video-tarjeta',
  templateUrl: './video-tarjeta.component.html',
  styles: [
    `
    mat-card{
      margin-top: 20px;
    }
    `  
  ]
  })
export class VideoTarjetaComponent implements OnInit {

  @Input() video!: IVideo;

  constructor() { }

  ngOnInit(): void {
  }

}
