import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personne } from 'models/personne.model';
import { Utilisateur } from 'models/utilisataeur.model';
import { UtilitiesService } from 'services/tools/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private host:string = this.ipService.ipAdresseAPI.valueOf();

  constructor(private ipService:UtilitiesService, private httpCli:HttpClient) { }

  //Partie réservée pour Utilisateur

  getAllUtilisateurs(){
    return this.httpCli.get<Utilisateur[]>(this.host+'definition/user/all');
  }

  getAUtilisateurById(code:string){
    return this.httpCli.get<Utilisateur>(this.host+'definition/user/byCod/'+code); 
  }

  addAUtilisateur(corps:Utilisateur){
    return this.httpCli.post<Utilisateur>(this.host+'definition/user/all', corps);
  }

  editAUtilisateur(code:string, corps:Utilisateur){
    return this.httpCli.put<Utilisateur>(this.host+'definition/user/byCod/'+code, corps);
  }

  deleteAUtilisateur(code:string){
    return this.httpCli.delete<boolean>(this.host+'definition/user/byCod/'+code);
  }

  //Partie réservée pour Personne
  getAllPersonnes(){
    return this.httpCli.get<Personne[]>(this.host+'definition/perso/all');
  }

  getAPersonneById(code:string){
    return this.httpCli.get<Personne>(this.host+'definition/perso/byCod/'+code); 
  }

  addAPersonne(corps:Personne){
    return this.httpCli.post<Personne>(this.host+'definition/perso/all', corps);
  }

  editAPersonne(code:string, corps:Personne){
    return this.httpCli.put<Personne>(this.host+'definition/perso/byCod/'+code, corps);
  }

  deleteAPersonne(code:string){
    return this.httpCli.delete<boolean>(this.host+'definition/perso/byCod/'+code);
  }

}
