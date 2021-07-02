import { Caisse } from "./caisse.model";
import { TypeOpCaisse } from "./typeop.model";
import { Utilisateur } from "./utilisataeur.model";

export  class OpCaisse{
    numOpCaisse: String;
    constructor (public  dateOp: Date, public typeOp:TypeOpCaisse, public val : number, public valide : boolean, public datSaisie: Date,
        public user:Utilisateur, public  caisse:Caisse){}
}