import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  public ipAdresseAPI:String = 'http://127.0.0.1:8080/adjonu/V1/'

  constructor() { }
}
