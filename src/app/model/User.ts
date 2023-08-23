import { Bus } from "./Bus";

export class User {
    private id : number;
    private nom : string;
    private prenom : string;
    private userCode : number;
    private bus : Bus;
    constructor(id: number,nom: string, prenom: string, userCode: number, bus : Bus)
    {
        this.id =id;
        this.nom = nom;
        this.prenom =prenom;
        this.userCode = userCode;
        this.bus = bus;

    }


}