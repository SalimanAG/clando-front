import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Caisse } from 'models/caisse.model';
import { UtilitiesService } from 'services/tools/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class CaissiereService {

  private host:string = this.ipService.ipAdresseAPI.valueOf();

  constructor(private ipService:UtilitiesService, private httpCli:HttpClient) { }

  getAllCaisse(){
    return this.httpCli.get<Caisse[]>(this.host+'cotisation/caisse/all');
  }

  getCaisseById(code:string){
    return this.httpCli.get<Caisse>(this.host+'cotisation/caisse/byCod/'+code); 
  }

  addCaisse(corps:Caisse){
    return this.httpCli.post<Caisse>(this.host+'cotisation/caisse/all', corps);
  }

  editCaisse(code:string, corps:Caisse){
    return this.httpCli.put<Caisse>(this.host+'cotisation/caisse/byCod/'+code, corps);
  }

  deleteCaisse(code:string){
    return this.httpCli.delete<boolean>(this.host+'cotisation/caisse/byCod/'+code);
  }
    
}
