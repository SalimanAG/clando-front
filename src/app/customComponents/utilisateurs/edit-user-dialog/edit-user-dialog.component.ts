import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { Personne } from 'models/personne.model';
import { Utilisateur } from 'models/utilisataeur.model';
import { DialogData1 } from '../utilisateurs.component';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  editAUserForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<EditUserDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceUser:UtilisateurService, 
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogData1) { 
      this.editAUserForm = bulder.group({
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

  onValiderUserEditClicked(){

    let newPers:Personne = new Personne(this.editAUserForm.value['nom'], this.editAUserForm.value['prenoms'],
    this.editAUserForm.value['sexe'], this.editAUserForm.value['dateNaissance'],
    this.editAUserForm.value['lieuNaissance'], this.editAUserForm.value['situationMatri'], 
    this.editAUserForm.value['profession'], this.editAUserForm.value['villeResidence'], 
    this.editAUserForm.value['tel'], this.editAUserForm.value['autresInfos']);
    
    this.serviceUser.editAPersonne(this.dialogData.user.personne.idPers.toString(), newPers).subscribe(
      (data) => {
        let newUser:Utilisateur = new Utilisateur(this.editAUserForm.value['login'], null, this.editAUserForm.value['askMdp'], 
        false, data)
        this.serviceUser.editAUtilisateur(this.dialogData.user.idUser.toString(), newUser).subscribe(
          (data2) => {
            this.dialogRef.close(true);
            this.toastr.success('Modification effectuée avec Succès', 'Modifier Utilisateur');
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
