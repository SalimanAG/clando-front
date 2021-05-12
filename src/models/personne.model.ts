
export class Personne{

    public idPers:number;

    constructor(public nomPers:String, public prePers:String, public sexPers:String,
        public askingPass:boolean, public datNaiPers:Date, public lieuNaiPers:String,
        public photoPers:Blob, public sitMatPers:String, public enLigne:boolean,
        public profPers:String, public vilPers:String, public numTelPers:String, 
        public autreinfos:String){

    }

}