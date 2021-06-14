import { Caisse } from "./caisse.model";
import { Utilisateur } from "./utilisataeur.model";

export  class OpCaisse{
    constructor (public  dateOp: Date, public typeOp:String, public val : number, public valide : boolean, public datSaisie: Date,
        public user:Utilisateur, public  caisse:Caisse){}
}