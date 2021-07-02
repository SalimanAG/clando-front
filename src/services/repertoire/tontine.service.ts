import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Affecter } from 'models/affecter.model';
import { Carnet } from 'models/carnet.model';
import { Ramassage } from 'models/ramassage.model';
import { Tontine } from 'models/tontine.model';
import { UtilitiesService } from 'services/tools/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class TontineService {

  private host:string = this.ipService.ipAdresseAPI.valueOf();

  constructor(private ipService:UtilitiesService, private httpCli:HttpClient) { }

  getAllTontines(){
    return this.httpCli.get<Tontine[]>(this.host+'cotisation/ton/all');
  }

  getATontineById(code:string){
    return this.httpCli.get<Tontine>(this.host+'cotisation/ton/byCod/'+code); 
  }

  addATontine(corps:Tontine){
    return this.httpCli.post<Tontine>(this.host+'cotisation/ton/all', corps);
  }

  editATontine(code:string, corps:Tontine){
    return this.httpCli.put<Tontine>(this.host+'cotisation/ton/byCod/'+code, corps);
  }

  deleteATontine(code:string){
    return this.httpCli.delete<boolean>(this.host+'cotisation/ton/byCod/'+code);
  }

///////Traitement de Carnet

  getAllCarnet(){
    return this.httpCli.get<Carnet[]>(this.host+'definition/carnet/all');
  }

  getACarnetId(code:string){
    return this.httpCli.get<Carnet>(this.host+'definition/carnet/byCod/'+code); 
  }

  addACarnet(corps:Carnet){
    return this.httpCli.post<Carnet>(this.host+'definition/carnet/all', corps);
  }

  editACarnet(code:string, corps:Carnet){
    return this.httpCli.put<Carnet>(this.host+'definition/carnet/byCod/'+code, corps);
  }

  deleteACarnet(code:string){
    return this.httpCli.delete<boolean>(this.host+'definition/carnet/byCod/'+code);
  }

  /////////Traitement de ramassage
    
  getAllRamassage(){
    return this.httpCli.get<Ramassage[]>(this.host+'cotisation/ramassage/all');
  }

  getARamassageById(code:String){
    return this.httpCli.get<Ramassage>(this.host+'cotisation/ramassage/byCod/'+code); 
  }

  addARamassage(corps:Ramassage){
    return this.httpCli.post<Ramassage>(this.host+'cotisation/ramassage/all', corps);
  }

  editARamassage(code:String, corps:Ramassage){
    return this.httpCli.put<Ramassage>(this.host+'cotisation/ramassage/byCod/'+code, corps);
  }

  deleteARamassage(code: String){
    return this.httpCli.delete<boolean>(this.host+'cotisation/ramassage/byCod/'+code);
  }

  /////////Traitement de AFFECTER
    
  getAllAffecter(){
    return this.httpCli.get<Affecter[]>(this.host+'cotisation/affecter/all');
  }

  getAnAffecterById(code:String){
    return this.httpCli.get<Affecter>(this.host+'cotisation/affecter/byCod/'+code); 
  }

  addAnAffecter(corps:Affecter){
    return this.httpCli.post<Affecter>(this.host+'cotisation/affecter/all', corps);
  }

  editAAffecter(code:String, corps:Affecter){
    return this.httpCli.put<Affecter>(this.host+'cotisation/affecter/byCod/'+code, corps);
  }

  deleteAAffecter(code: String){
    return this.httpCli.delete<boolean>(this.host+'cotisation/affecter/byCod/'+code);
  }


}
