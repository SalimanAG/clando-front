import { OpCaisse } from "./opcaisse.model";
import { Tontine } from "./tontine.model";

export class Ramassage{
    numRama : String;
    constructor( public dateRam: Date, public typeRam:String, public natLot:String, 
        public penalite:number, public complement : number, public lotservi:String,
         public valider:boolean, public tontine:Tontine, public opcaisse:OpCaisse){}
}