import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from 'models/utilisataeur.model';
import { UtilitiesService } from 'services/tools/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private host:string = this.ipService.ipAdresseAPI.valueOf();

  constructor(private ipService:UtilitiesService, private httpCli:HttpClient) { }

  getAllUtilisateurs(){
    return this.httpCli.get<Utilisateur[]>(this.host+'user/all');
  }

  getAUtilisateurById(code:string){
    return this.httpCli.get<Utilisateur>(this.host+'user/byId/'+code); 
  }

  addAUtilisateur(corps:Utilisateur){
    return this.httpCli.post<Utilisateur>(this.host+'user/all', corps);
  }

  editAUtilisateur(code:string, corps:Utilisateur){
    return this.httpCli.put<Utilisateur>(this.host+'user/byId/'+code, corps);
  }

  deleteAUtilisateur(code:string){
    return this.httpCli.delete(this.host+'user/byId/'+code);
  }

}
