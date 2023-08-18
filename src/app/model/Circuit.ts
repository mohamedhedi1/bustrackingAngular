import { Station } from "./Station";

export class Circuit {
   
    private nom: string;
    private stations: Station[];

    constructor( nom: string, stations: Station[]) {
        
        this.nom = nom;
        this.stations = stations;
    }
}

