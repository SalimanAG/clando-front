import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Objet } from 'models/objet.model';
import { UtilitiesService } from 'services/tools/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ObjetsTontineService {

  private host:string = this.ipService.ipAdresseAPI.valueOf();

  constructor(private ipService:UtilitiesService, private httpCli:HttpClient) { }

  getAllObjets(){
    return this.httpCli.get<Objet[]>(this.host+'definition/obj/all');
  }

  getAObjetById(code:string){
    return this.httpCli.get<Objet>(this.host+'definition/obj/byCod/'+code); 
  }

  addAObjet(corps:Objet){
    return this.httpCli.post<Objet>(this.host+'definition/obj/all', corps);
  }

  editAObjet(code:string, corps:Objet){
    return this.httpCli.put<Objet>(this.host+'definition/obj/byCod/'+code, corps);
  }

  deleteAObjet(code:string){
    return this.httpCli.delete<boolean>(this.host+'definition/obj/byCod/'+code);
  }



}
