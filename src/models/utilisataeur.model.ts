import { Personne } from "./personne.model";

export class Utilisateur{

    constructor(public login:String, public motDePasse:String, public askingPass:boolean, 
        public enLigne:boolean, public personne:Personne){

    }

}