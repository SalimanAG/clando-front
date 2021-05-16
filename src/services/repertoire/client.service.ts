import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'models/client.model';
import { UtilitiesService } from 'services/tools/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  
  private host:string = this.ipService.ipAdresseAPI.valueOf();

  constructor(private ipService:UtilitiesService, private httpCli:HttpClient) { }

  getAllClients(){
    return this.httpCli.get<Client[]>(this.host+'definition/client/all');
  }

  getAClientById(code:string){
    return this.httpCli.get<Client>(this.host+'definition/client/byCod/'+code); 
  }

  addAClient(corps:Client){
    return this.httpCli.post<Client>(this.host+'definition/client/all', corps);
  }

  editAClient(code:string, corps:Client){
    return this.httpCli.put<Client>(this.host+'definition/client/byCod/'+code, corps);
  }

  deleteAClient(code:string){
    return this.httpCli.delete<boolean>(this.host+'definition/client/byCod/'+code);
  }


}
