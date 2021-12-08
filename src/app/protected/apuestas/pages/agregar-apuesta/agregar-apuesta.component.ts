import { Component, OnInit } from '@angular/core';
import { IApuesta } from '../../interfaces/apuesta.interface';
import { IVideo } from 'src/app/protected/videos/interfaces/video.interface';
import { Mvideo } from '../../../../modelo/video';
import { ApuestaService } from '../../services/apuesta.service';
import { VideosService } from '../../../videos/services/videos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
   private snackBar: MatSnackBar,
   private fb:FormBuilder) { }
 

  ngOnInit(): void {

    this._httpVideo.getVideos().subscribe(data=>{
      console.log("estamos en getvideos apuesta");
      console.log(data);

     
      this.videos = data })

      this.miFormulario.reset({
        
      })
  }


  onSelect(id:number):void{

    console.log('id->', id)

  }


  miFormulario: FormGroup = this.fb.group({
    id:['',[Validators.required]],
    preciov:  ['',[Validators.required, Validators.minLength(0)]],
    preciol:  ['',[Validators.required, Validators.minLength(0)]],
    preciod:  ['',[Validators.required, Validators.minLength(0)]],
    precioc:  ['',[Validators.required, Validators.minLength(0)]],
    activo:  ['',[Validators.required, Validators.minLength(2)]],
    fechahoraapuesta:  ['',[Validators.required]]
   })

  guardarApuesta(){
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched()
      return;
    }

    
    
    let fechaApuesta:string = this.miFormulario.value.fechahoraapuesta



    let precioViews = this.miFormulario.value.preciov
    let precioLike= this.miFormulario.value.preciol
    let precioDislike = this.miFormulario.value.preciod
    let precioComents = this.miFormulario.value.precioc
    let videoActivo = this.miFormulario.value.activo

    this._httpVideo.getVideosPorId(this.miFormulario.value.id).subscribe((resp:any)=>{
      this.videos=resp.items;
      
      //mapeamos los valores
      this.apuestaVideo.video = resp //id
      this.apuestaVideo.preciov = precioViews;
      this.apuestaVideo.preciol = precioLike;
      this.apuestaVideo.preciod = precioDislike;
      this.apuestaVideo.precioc = precioComents;
      this.apuestaVideo.activo = precioViews;
      this.apuestaVideo.fechahoraapuesta = this.formatearFecha( fechaApuesta)

      this._httpApuesta.agregarVideoApuesta(this.apuestaVideo)
      .subscribe( resp =>console.log("datos recibidos",resp))
    
      console.log("Entradmos en guardar apuesta" ,this.apuestaVideo.video, precioViews,precioLike,precioDislike,precioComents,videoActivo)
     


              });


    

    this.miFormulario.reset()

     
    
      //this.router.navigate('/dashboard/agregarapuesta')
    

    

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

    elCampoNoEsValido( campo: string){
      return this.miFormulario.controls[campo].errors && 
      this.miFormulario.controls[campo].touched
    }
}
