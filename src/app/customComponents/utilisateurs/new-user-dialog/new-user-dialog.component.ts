import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Personne } from 'models/personne.model';
import { Utilisateur } from 'models/utilisataeur.model';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'services/administration/utilisateur.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.css']
})
export class NewUserDialogComponent implements OnInit {

  addAUserForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<NewUserDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceUser:UtilisateurService) { 
      this.addAUserForm = bulder.group({
        login: ['', Validators.required],
        nom: ['', Validators.required],
        prenoms: ['', Validators.required],
        tel: ['', Validators.required],
        dateNaissance: [''],
        lieuNaissance: [''],
        situationMatri: [''],
        profession: [''],
        villeResidence: ['', Validators.required],
        sexe: ['M', Validators.required],
        actif: [false, Validators.required],
        askMdp: [true, Validators.required],
        photo: [''],
        autresInfos: ['']

      })
  }

  ngOnInit(): void {
  }

  onValiderUserSaveClicked(){
    let newPers:Personne = new Personne(this.addAUserForm.value['nom'], this.addAUserForm.value['prenoms'],
    this.addAUserForm.value['sexe'], this.addAUserForm.value['dateNaissance'],
    this.addAUserForm.value['lieuNaissance'], this.addAUserForm.value['situationMatri'], 
    this.addAUserForm.value['profession'], this.addAUserForm.value['villeResidence'], 
    this.addAUserForm.value['tel'], this.addAUserForm.value['autresInfos']);
    
    this.serviceUser.addAPersonne(newPers).subscribe(
      (data) => {
        let newUser:Utilisateur = new Utilisateur(this.addAUserForm.value['login'], null, this.addAUserForm.value['askMdp'], 
        false, data)
        this.serviceUser.addAUtilisateur(newUser).subscribe(
          (data2) => {
            this.dialogRef.close(true);
            this.toastr.success('Enrégistrement effectué avec Succès', 'Nouveau Utilisateur');
          },
          (erreur) => {
            console.log('Erreur lors de l\'Ajout de Personne.', erreur);
            this.toastr.error('Erreur lors de l\'Ajout de l\'Utilisateur.\n Code : '+erreur.status+' | '+erreur.statusText, 'Utilisateurs');
          }
        );

      },
      (erreur) => {
        console.log('Erreur lors de l\'Ajout de Personne.', erreur);
        this.toastr.error('Erreur lors de l\'Ajout de Personne.\n Code : '+erreur.status+' | '+erreur.statusText, 'Utilisateurs');
      }
    );
    
    

  }

}
