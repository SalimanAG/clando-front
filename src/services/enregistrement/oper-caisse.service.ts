import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpCaisse } from 'models/opcaisse.model';
import { UtilitiesService } from 'services/tools/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class OperCaisseService {

  hote : String=this.ipserv.ipAdresseAPI.toString();
  constructor(private ipserv: UtilitiesService, private http : HttpClient) { }

  getAllOpCaisse(){
    return this.http.get<OpCaisse[]>(this.hote+'cotisation/opc/all');
  }

  getAnOpCaisse(cod : String){
    return this.http.get<OpCaisse[]>(this.hote+'cotisation/opc/byCod/'+cod);
  }

  addAnOpCaisse(corp: OpCaisse){
    return this.http.post<OpCaisse[]>(this.hote+'cotisation/opc/all',corp);
  }

  editAnllOpCaisse(cod : String, corp: OpCaisse){
    return this.http.put<OpCaisse[]>(this.hote+'cotisation/opc/byCod/'+cod, corp);
  }

  deleteAnOpCaisse(cod : String){
    return this.http.delete<boolean>(this.hote+'cotisation/opc/byCod/'+cod);
  }
}
