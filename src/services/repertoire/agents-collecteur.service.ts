import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collecte } from 'models/collecte.model';
import { Collecteur } from 'models/collecteur.model';
import { UtilitiesService } from 'services/tools/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AgentsCollecteurService {

  private host:string = this.ipService.ipAdresseAPI.valueOf();

  constructor(private ipService:UtilitiesService, private httpCli:HttpClient) { }

  getAllCollecteurs(){
    return this.httpCli.get<Collecteur[]>(this.host+'definition/collecteur/all');
  }

  getACollecteurById(code:string){
    return this.httpCli.get<Collecteur>(this.host+'definition/collecteur/byCod/'+code); 
  }

  addACollecteur(corps:Collecteur){
    return this.httpCli.post<Collecteur>(this.host+'definition/collecteur/all', corps);
  }

  editACollecteur(code:string, corps:Collecteur){
    return this.httpCli.put<Collecteur>(this.host+'definition/collecteur/byCod/'+code, corps);
  }

  deleteACollecteur(code:string){
    return this.httpCli.delete<boolean>(this.host+'definition/collecteur/byCod/'+code);
  }
  
  getAllCollectes(){
    return this.httpCli.get<Collecte[]>(this.host+'cotisation/collecte/all');
  }

  getACollecteById(code:string){
    return this.httpCli.get<Collecte>(this.host+'cotisation/collecte/byCod/'+code); 
  }
//
  //getCollecteByCollectteur(code:string, deb: Date, fin: Date){
//    return this.httpCli.get<Collecte>(this.host+'definition/collecte/byCol/'+code, deb, fin); 
//  }

  addACollecte(corps:Collecte){
    return this.httpCli.post<Collecte>(this.host+'cotisation/collecte/all', corps);
  }

  editACollecte(code:string, corps:Collecte){
    return this.httpCli.put<Collecte>(this.host+'cotisation/collecte/byCod/'+code, corps);
  }

  deleteACollecte(code:string){
    return this.httpCli.delete<boolean>(this.host+'cotisation/collecte/byCod/'+code);
  }
  
}
