import { Agence } from "./agence.model";
import { Personne } from "./personne.model";

export class Associer{

    public idAssocier: Number = null;

    constructor(public datDeb: Date, public datFin: Date, public agence: Agence, 
        public pers: Personne, public validateur?: boolean, public valRamassage?: boolean){

    }

}