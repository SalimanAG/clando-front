import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilisateurService } from 'services/administration/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private serviceUser:UtilisateurService, private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot)
  :Observable<boolean> | Promise<boolean> | boolean {
    if(this.serviceUser.isAuth === true){
      return true;
    }
    else {
      this.router.navigateByUrl('/auth');
    }
  }
  

}
