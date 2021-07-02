import { Collecteur } from "./collecteur.model";
import { Tontine } from "./tontine.model";

export class Affecter{
    
    constructor(public datAffecter: Date, publicencours : boolean, 
        public collecteur: Collecteur, public tontine: Tontine){}
}