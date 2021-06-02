import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    

}
