import { Agence } from "./agence.model";
import { MotifDepense } from "./motifDepense.model";
import { OpCaisse } from "./opcaisse.model";

export class Depense {

    
    constructor(public numDep: number, public dateDep: Date, public beneficiaire: String,
        public description: String, public montant: number, public etatValide: boolean,
        public opCaisse: OpCaisse, public motif: MotifDepense, public agence: Agence){

    }



}