import { User } from "./User";


export class Bus {
 
    private bus: string;
    private users: User[];

    constructor( bus:string, users: User[]) {
   
        this.bus = bus;
        this.users = users;
    }
}

