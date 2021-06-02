import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { UtilitiesService } from 'services/tools/utilities.service';
import { Agence } from 'models/agence.model';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {
  private host:string = this.ipService.ipAdresseAPI.valueOf();

  constructor(private ipService:UtilitiesService, private httpCli:HttpClient) { }

  getAllAgences(){
    return this.httpCli.get<Agence[]>(this.host+'definition/agence/all');
  }

  getAnAgenceById(code:string){
    return this.httpCli.get<Agence>(this.host+'definition/agence/byCod/'+code); 
  }

  addAnAgence(corps:Agence){
    return this.httpCli.post<Agence>(this.host+'definition/agence/all', corps);
  }

  editAnAgence(code:string, corps:Agence){
    return this.httpCli.put<Agence>(this.host+'definition/agence/byCod/'+code, corps);
  }

  deleteAnAgence(code:string){
    return this.httpCli.delete<boolean>(this.host+'definition/agence/byCod/'+code);
  }

}
