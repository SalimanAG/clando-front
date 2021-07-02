import { Collecteur } from "./collecteur.model";
import { OpCaisse } from "./opcaisse.model";
import { Personne } from "./personne.model";
import { Tontine } from "./tontine.model";

export class Collecte {

    public idCollecte: number = null;

    public constructor(public dateCollecte: Date, public nbreMise: number, 
        public tontine: Tontine, public collecteur: Collecteur, public opcaisse: OpCaisse){

    }

}