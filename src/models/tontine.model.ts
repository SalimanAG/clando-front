import { Carnet } from "./carnet.model";
import { Client } from "./client.model";
import { Collecteur } from "./collecteur.model";
import { Objet } from "./objet.model";

export class Tontine{
    numTont : number;
    public constructor(public dateDebut : Date, public dateFin: Date, 
        public encours: boolean, public servir: Date, public carnet: Carnet,
        public collecteur?: Collecteur){

    }

}