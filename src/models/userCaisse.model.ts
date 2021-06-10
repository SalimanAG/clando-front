import { Caisse } from "./caisse.model";
import { Utilisateur } from "./utilisataeur.model";

export class UserCaisse {

    public idUserCaisse: Number = null;

    constructor(public dateArrivee: Date, public dateDepart: Date, public motifDepart: String, 
        public caisse: Caisse, public utilisateur: Utilisateur){

    }


}