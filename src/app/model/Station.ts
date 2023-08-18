import { Circuit } from "./Circuit";

export class Station {
    private id : number;
    private station : string;
    private longitude_position : number;
    private latitude_position : number;
    private circuit : Circuit;
    constructor(id: number,station: string, longitude_position: number, latitude_position: number, circuit : Circuit)
    {
        this.id =id;
        this.station = station;
        this.longitude_position =longitude_position;
        this.latitude_position = latitude_position;
        this.circuit = circuit;

    }


}