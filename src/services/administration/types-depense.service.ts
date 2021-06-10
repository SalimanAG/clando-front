import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MotifDepense } from 'models/motifDepense.model';
import { UtilitiesService } from 'services/tools/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class TypesDepenseService {

  private host:string = this.ipService.ipAdresseAPI.valueOf();

  constructor(private ipService:UtilitiesService, private httpCli:HttpClient) { }

  getAllMotifDepenses(){
    return this.httpCli.get<MotifDepense[]>(this.host+'definition/mds/all');
  }

  getAMotifDepenseById(code:string){
    return this.httpCli.get<MotifDepense>(this.host+'definition/mds/byCod/'+code); 
  }

  addAMotifDepense(corps:MotifDepense){
    return this.httpCli.post<MotifDepense>(this.host+'definition/mds/all', corps);
  }

  editAMotifDepense(code:string, corps:MotifDepense){
    return this.httpCli.put<MotifDepense>(this.host+'definition/mds/byCod/'+code, corps);
  }

  deleteAObjet(code:string){
    return this.httpCli.delete<boolean>(this.host+'definition/mds/byCod/'+code);
  }


  


}
