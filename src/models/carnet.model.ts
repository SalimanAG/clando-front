import { Agence } from "./agence.model";
import { Client } from "./client.model";
import { Collecteur } from "./collecteur.model";
import { Objet } from "./objet.model";
import { OpCaisse } from "./opcaisse.model";

export class Carnet{
    
    constructor( public idCarnet: String, public mise: number , 
        public dispo: boolean, public objet: Objet, public collecteur: Collecteur,
        public client: Client, public agence: Agence, public opcaisse: OpCaisse){}
}