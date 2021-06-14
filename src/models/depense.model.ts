import { MotifDepense } from "./motifDepense.model";

export class Depense {

    
    constructor(public numDep: String, public dateDep: Date, public beneficiaire: String,
        public description: String, public montant: number, public etatValide: String,
        public opCaisse: any, public motif: MotifDepense){

    }



}