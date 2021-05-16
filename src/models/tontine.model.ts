import { Client } from "./client.model";
import { Collecteur } from "./collecteur.model";
import { Objet } from "./objet.model";

export class Tontine{


    public constructor(public numTont: String, public mise: Number, public dateDebut: Date, 
        public dateFin: Date, public collecteur: Collecteur, public clt: Client, public objet: Objet){

    }

}