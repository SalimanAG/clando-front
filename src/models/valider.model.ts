import { Depense } from "./depense.model";
import { Utilisateur } from "./utilisataeur.model";

export class Valider {

    public idValider: number = null;

    constructor(public datValidation: Date, public avis: String, public titre: String, 
        public utilisateur: Utilisateur, public depense: Depense){


    }


}