import { Personne } from "./personne.model";

export class Collecteur {

    public idCollecteur: number = null;

    public constructor(public dateArrive: Date, public collecteurActif: boolean, 
        public dateArret: Date, public motifArret: String, public personne: Personne){

    }

}