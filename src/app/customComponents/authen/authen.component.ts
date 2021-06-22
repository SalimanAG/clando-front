import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from 'models/utilisataeur.model';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'services/administration/utilisateur.service';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.css']
})
export class AuthenComponent implements OnInit {
  connnectForm: FormGroup;
  confirmation:boolean = false;
  user: Utilisateur = null;

  constructor(private routeur:Router, private toastr: ToastrService, 
    private utilisateurService: UtilisateurService, 
    private formBulder:FormBuilder) { }

  ngOnInit(): void {

    this.connnectForm = this.formBulder.group({
      login:['', Validators.required],
      mdp:['', Validators.required],
      mdp2:''
    });

  }

  loginClicked(){
    console.log('clic');
    if(this.confirmation){
      
      if(this.connnectForm.value.mdp2 == this.connnectForm.value.mdp){
        console.log('conne', new Utilisateur(this.connnectForm.value.login, this.connnectForm.value.mdp, false, false, this.user.personne));
        this.utilisateurService.editAUtilisateur(this.user.idUser.toString(), new Utilisateur(this.connnectForm.value.login, this.connnectForm.value.mdp, false, false, this.user.personne)).subscribe(
          (data) => {
            this.utilisateurService.connectedUser = data;
            console.log('connected', data);
            this.utilisateurService.isAuth = true;
            this.routeur.navigateByUrl('/dashboard');

          },
          (erreur) => {
            console.log('Erreur lors de la connexion au serveur', erreur);
            this.toastr.error('Erreur lors de connexion au serveur.\n Code : '+erreur.status+' | '+erreur.statusText, 'Connexion');
          }
        );
      }
      else{
        this.toastr.error('Erreur de Confirmation de Mot de Passe', 'Connexion');
      }
      
      
    }
    else{
      this.utilisateurService.getAUtilisateurByLoginMdp(new Utilisateur(this.connnectForm.value.login, this.connnectForm.value.mdp, false, false, null)).subscribe(
        (data) => {
          if(data){
            this.utilisateurService.connectedUser = data;
            this.utilisateurService.isAuth = true;
            this.routeur.navigateByUrl('/dashboard');
          }
          else{
            this.toastr.error('Identifiant Ou Mot de Passe Incorrecte', 'Connexion');
          }
        },
        (erreur) => {
          console.log('Erreur lors de la connexion au serveur', erreur);
          
          this.toastr.error('Erreur lors de connexion au serveur.\n Code : '+erreur.status+' | '+erreur.statusText, 'Connexion');
        }
        
      );
    }
  }

  identifiantSuplied(){
    this.utilisateurService.getAUtilisateurByLoginMdp(new Utilisateur(this.connnectForm.value.login, '', false, false, null)).subscribe(
      (data) => {
        if(data){
          this.confirmation = true;
          this.user = data;
        }
        else{
          this.confirmation = false;
        }
      },
      (erreur) => {
        console.log('Erreur lors de la connexion au serveur', erreur);
        
        this.toastr.error('Erreur lors de connexion au serveur.\n Code : '+erreur.status+' | '+erreur.statusText, 'Connexion');
      }
    );
    
  }

}
