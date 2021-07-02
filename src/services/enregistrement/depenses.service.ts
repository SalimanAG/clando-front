import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Depense } from 'models/depense.model';
import { MotifDepense } from 'models/motifDepense.model';
import { Valider } from 'models/valider.model';
import { UtilitiesService } from 'services/tools/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class DepensesService {
  hote: String=this.ipAdresse.ipAdresseAPI.toString();

  constructor(public ipAdresse: UtilitiesService, public http: HttpClient) { 
    
  }

  /////////////Traitement des motifs de dépense//////////////
  getAllMotifDepense(){
    return this.http.get<MotifDepense[]>(this.hote+'definition/mds/all');
  }
  getAMotifDepense(cod : String){
    return this.http.get<MotifDepense[]>(this.hote+'definition/mds/byCod/'+cod);
  }
  saveAMotifDepense(corp: MotifDepense){
    return this.http.post<MotifDepense>(this.hote+'definition/mds/all',corp);
  }
  editAMotifDepense(cod: String, corps: MotifDepense){
    return this.http.put<MotifDepense>(this.hote+'definition/mds/byCod/'+cod,corps);
  }
  deleteAMotifDepense(cod: String){
    return this.http.delete<boolean>(this.hote+'definition/mds/byCod'+cod);
  }

  /////////////Traitement des  dépense//////////////
  getAllDepense(){
    return this.http.get<Depense[]>(this.hote+'cotisation/depense/all');
  }
  getADepense(cod : String){
    return this.http.get<Depense[]>(this.hote+'cotisation/depense/ByCod/'+cod);
  }
  saveADepense(corp: Depense){
    return this.http.post<Depense>(this.hote+'cotisation/depense/all',corp);
  }
  editADepense(cod: String, corps: Depense){
    return this.http.put<Depense>(this.hote+'cotisation/depense/byCod/'+cod,corps);
  }
  deleteADepense(cod: String){
    return this.http.delete<boolean>(this.hote+'cotisation/depense/byCod/'+cod);
  }

  /////////////Traitement des motifs de dépense//////////////
  getAllValidation(){
    return this.http.get<Valider[]>(this.hote+'cotisation/valider/all');
  }
  getAValidation(cod : String){
    return this.http.get<Valider[]>(this.hote+'cotisation/valider/byCod'+cod);
  }
  saveAValidation(corp: Valider){
    return this.http.post<Valider>(this.hote+'cotisation/valider/all',corp);
  }
  editAValidation(cod: String, corps: Valider){
    return this.http.put<Valider>(this.hote+'cotisation/valider/byCod/'+cod,corps);
  }
  deleteAValidation(cod: String){
    return this.http.delete<boolean>(this.hote+'cotisation/valider/byCod'+cod);
  }
}
