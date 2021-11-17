import { IVideo } from "../protected/videos/interfaces/video.interface";

export class Mvideo implements IVideo{
    id?:         number;
    idVideo:    string;
    titulo:     string;
    urlVideo:   string;
    canal:      string;
    activo:     boolean;
    fechaVideo: string;
    artista:    string;
    duracion:   string;
    } 