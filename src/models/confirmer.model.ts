import { Associer } from "./associer.model";
import { MotifDepense } from "./motifDepense.model";

export class Confirmer {

    public idStatut: number = null;

    constructor(public actif: boolean, public associer: Associer, public motifDepense: MotifDepense){

    }


}