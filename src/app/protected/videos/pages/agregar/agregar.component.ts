import { Component, OnInit } from '@angular/core';
import { IVideo } from '../../interfaces/video.interface';
import { YoutubeService } from '../../services/youtube-service.service';
import { VideosService } from '../../services/videos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
  .row { 
    display: flex;
  }
  .col {
flex-grow:1;
margin-right: 10px;
  }

  input {
    display: block;
    margin: 5px;
  }
  `
  ]
})
export class AgregarComponent implements OnInit {
  
  urlIngresada: string;
  urlProcesada:boolean;
  videoId:string;
  videos : any[] = [];

  video : IVideo = {
    idVideo:'',
    titulo: '',
    urlVideo:'',
    canal:'',
    activo: true,
    fechaVideo:'',
    artista:'',
    duracion:''
  }

  activo = [
    {
      desc: 'true'
    },
    {
      desc: 'false'
    }
  ];


  constructor(private _youtube:YoutubeService, private videosService:VideosService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,    
    private fb:FormBuilder){
    this.urlIngresada = '';
    this.videoId=''
    this.urlProcesada=false;
      }

    miFormulario: FormGroup = this.fb.group({

      idVideo:['',[Validators.required, Validators.minLength(3)]],
      titulo:  ['',[Validators.required, Validators.minLength(3)]],
      urlVideo:  ['',[Validators.required, Validators.minLength(3)]],
    canal:  ['',[Validators.required, Validators.minLength(3)]],
    activo:  ['true',[Validators.required, Validators.minLength(3)]],
    fechaVideo:  ['',[Validators.required, Validators.minLength(3)]],
    artista:  ['',[Validators.required, Validators.minLength(3)]],
    duracion: ['null',[Validators.required, Validators.minLength(3)]]


    })

  ngOnInit(): void {
  }
  /**
   * procesarUrl
   * @params urlYoutube, es la ruta del video de youtube a procesar.
   * 
   * Este metodo permite procesar una url y obtener sus detalles.
   */
  procesarUrl(urlYoutube: string){
    console.log ("nombreUrl recibido es " + urlYoutube)
    this.urlProcesada = true;
    let str: string = urlYoutube;
    var separador = str.split('=');
  
    console.log(separador[1]);
    let idVideo: string = separador[1]; 
    this.video.idVideo = idVideo
    this.video.urlVideo=urlYoutube;
  if ( this.videosService.getVideosPorIdVideo (idVideo)) {
    alert ("video ya existe")
  }
       this._youtube.getVideoYoutubeForId(idVideo)
	   .subscribe((resp: any) => {
      this.videos = resp.items;
        
       
    });
  }


  obtenerTituloYArtistaCanalFecha(titulo: string, canal:string, fecha:string): string {
    console.log("estamos en obtenerTituloCancion")
    let str: string = titulo;
    var separador = str.split('-');
    let artista:string =  separador[0];
    let cancion: string =  separador[1];
    let cancion25 = cancion.substr(0,25)

    console.log("25 caaracteres",cancion25);
    console.log ("titulo" + cancion);
    console.log ("artista" + artista);
    this.video.titulo = cancion25
    this.video.artista = artista
    this.video.canal = canal;
    let fechaRecibido:string = fecha
    var separadorFecha = fechaRecibido.split('T');
    let fechaPublicacionVideo:string =  separadorFecha[0];
   
    
    this.video.fechaVideo = fechaPublicacionVideo

    this.urlProcesada = true;

    return cancion;


  }

  tituloInvalido():boolean{
    return this.miFormulario?.controls.precio?.touched 
            && this.miFormulario?.controls.precio?.value > 25
  }


  mostrarSnackBar(mensaje: string){

    this.snackBar.open(mensaje, 'Cerrar', {
      duration:2500
    });
  }
  
  guardar(){

    if (this.video.idVideo.trim().length === 0 ){
      return;
    }
    
    if (this.miFormulario.invalid && this.miFormulario.touched != false){
      this.miFormulario.markAllAsTouched();
      return
    }

      
    
    //actualizar
     if (this.video.id){
       console.log("el id del video es", this.video.id)
        this.videosService.actualizarVideo(this.video)
        .subscribe (video => this.mostrarSnackBar("registro actualizaco con exito"))
     } else {
      //Crear
     this.videosService.agregarVideo(this.video)
    .subscribe( video => this.mostrarSnackBar("Registro Guardado con exito")) /* {
      
      this.router.navigate(['/videos/editar',video.id])
      
    } )*/
 
   }

  
}

}
