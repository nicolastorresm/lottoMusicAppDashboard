import { Component, OnInit } from '@angular/core';
import { IApuesta } from '../../interfaces/apuesta.interface';
import { IVideo } from 'src/app/protected/videos/interfaces/video.interface';
import { Mvideo } from '../../../../modelo/video';
import { ApuestaService } from '../../services/apuesta.service';
import { VideosService } from '../../../videos/services/videos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


interface Activos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-agregar-apuesta',
  templateUrl: './agregar-apuesta.component.html',
  styles: [
  ]
})
export class AgregarApuestaComponent implements OnInit {

  activos: Activos[] = [
    {value: 'true', viewValue: 'SI'},
    {value: 'false', viewValue: 'NO'}
  ];
  
  apuestaVideo: IApuesta = {
    video:null,
    activo:true,
    fechahoraapuesta:'',
    precioc:0,
    preciov:0,
    preciol:0,
    preciod:0
   }

   video: IVideo = {
     id:null,
    idVideo:'',
   titulo: '',
   urlVideo:'', 
   canal: '',
   activo: true,
   fechaVideo: '',
   artista:'',
   duracion:''
   }

   
  videos:Mvideo[];  
  videoSeleccionado : Number;
  fechaHoraApuestaFormateado:string
  

  constructor(private _httpApuesta:ApuestaService,
    private _httpVideo: VideosService,
   private router:Router,
   private snackBar: MatSnackBar) { }
 

  ngOnInit(): void {

    this._httpVideo.getVideos().subscribe(data=>{
      console.log("estamos en getvideos apuesta");
      console.log(data);

     
      this.videos = data })
  }


  onSelect(id:number):void{

    console.log('id->', id)

  }

  guardarApuesta(){

    console.log("Entradmos en guardar apuesta")
    this._httpVideo.getVideosPorId(this.video.id).subscribe((resp:any)=>{
      this.videos=resp.items;
      console.log("recibimos video.id" + this.video.id)
      console.log(resp)

      this.apuestaVideo.video = resp

      console.log("Ahora el valor de apuestavideoid es " +this.apuestaVideo.video)
      console.log("estamos en componente guardarApuesta")
      console.log("el valor de activo es  ", this.apuestaVideo.activo)
      console.log("el valor de fechahoraapuesta es  ", this.apuestaVideo.fechahoraapuesta)
      console.log("el valor de precioc es  ", this.apuestaVideo.precioc)
      console.log("el valor de preciov es  ", this.apuestaVideo.preciov)
      console.log("el valor de preciol es  ", this.apuestaVideo.preciol)
      console.log("el valor de preciod es  ", this.apuestaVideo.preciod)
      console.log("el valor de id desde videoID es  ", this.apuestaVideo.video.id)
      console.log("el valor de id desde fecha apuesta es  ",this.apuestaVideo.fechahoraapuesta)
      this.apuestaVideo.fechahoraapuesta= this.formatearFecha(this.apuestaVideo.fechahoraapuesta)
     console.log("el valor de id desde fechahoraapuesta formateado es   ",  this.apuestaVideo.fechahoraapuesta)
     
     
     
      /* if (this.apuestaVideo.id.trim().length === 0 ){
      return;
    } */
    this._httpApuesta.agregarVideoApuesta(this.apuestaVideo)
    .subscribe( resp =>console.log("datos recibidos",resp))
      
      //this.mostrarSnackBar('Apuesta Guardada'))
    //subscribe( resp =>this.mostrarSnackBar('Apuesta guardado con exito!'));
  
    
    });

  }

  
  formatearFecha(fechaHoraApuesta:string):string{

    console.log("estamos en formatear fecha, valor recibido ", fechaHoraApuesta)
    let str:string = fechaHoraApuesta;
    var separador = str.split('T');
        
        console.log("separador 1",separador[0]);
        console.log("separador 2",separador[1]);

    this.fechaHoraApuestaFormateado =  separador[0]+' '+separador[1]
    
    console.log("LA SUMA DE ESTOS SEPARADORES ES",this.fechaHoraApuestaFormateado)
     return this.fechaHoraApuestaFormateado;
    }

    mostrarSnackBar(mensaje: string):void{

      this.snackBar.open(mensaje, 'Ok!', {
        duration:2500
      });
    }

}
