import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associer } from 'models/associer.model';
import { Confirmer } from 'models/confirmer.model';
import { UserCaisse } from 'models/userCaisse.model';
import { UtilitiesService } from 'services/tools/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {

  private host:string = this.ipService.ipAdresseAPI.valueOf();

  constructor(private ipService:UtilitiesService, private httpCli:HttpClient) { }


  //Partie réservée pour association d'une personne à une agence

  getAllAssocier(){
    return this.httpCli.get<Associer[]>(this.host+'definition/asso/all');
  }

  getAAssocierById(code:string){
    return this.httpCli.get<Associer>(this.host+'definition/asso/byCod/'+code); 
  }

  addAAssocier(corps:Associer){
    return this.httpCli.post<Associer>(this.host+'definition/asso/all', corps);
  }

  editAAssocier(code:string, corps:Associer){
    return this.httpCli.put<Associer>(this.host+'definition/asso/byCod/'+code, corps);
  }

  deleteAAssocier(code:string){
    return this.httpCli.delete<boolean>(this.host+'definition/asso/byCod/'+code);
  }


  //Partie réservée pour Confirmer (Association d'une personne à un type de dépense pour une agence donnée)
  
  getAllConfirmer(){
    return this.httpCli.get<Confirmer[]>(this.host+'cotisation/conf/all');
  }

  getAConfirmerById(code:string){
    return this.httpCli.get<Confirmer>(this.host+'cotisation/conf/byCod/'+code); 
  }

  addAConfirmer(corps:Confirmer){
    return this.httpCli.post<Confirmer>(this.host+'cotisation/conf/all', corps);
  }

  editAConfirmer(code:string, corps:Confirmer){
    return this.httpCli.put<Confirmer>(this.host+'cotisation/conf/byCod/'+code, corps);
  }

  deleteAConfirmer(code:string){
    return this.httpCli.delete<boolean>(this.host+'cotisation/conf/byCod/'+code);
  }


    //Partie réservée pour Association d'un utilisateur à une caisse
  
    getAllUserCaisse(){
      return this.httpCli.get<UserCaisse[]>(this.host+'cotisation/ucais/all');
    }
  
    getAUserCaisseById(code:string){
      return this.httpCli.get<UserCaisse>(this.host+'cotisation/ucais/byCod/'+code); 
    }
  
    addAUserCaisse(corps:UserCaisse){
      return this.httpCli.post<UserCaisse>(this.host+'cotisation/ucais/all', corps);
    }
  
    editAUserCaisse(code:string, corps:UserCaisse){
      return this.httpCli.put<UserCaisse>(this.host+'cotisation/ucais/byCod/'+code, corps);
    }
  
    deleteAUserCaisse(code:string){
      return this.httpCli.delete<boolean>(this.host+'cotisation/ucais/byCod/'+code);
    }
  
 
}
