import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from 'models/client.model';
import { Personne } from 'models/personne.model';
import { Utilisateur } from 'models/utilisataeur.model';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { ClientService } from 'services/repertoire/client.service';

@Component({
  selector: 'app-new-client-dialog',
  templateUrl: './new-client-dialog.component.html',
  styleUrls: ['./new-client-dialog.component.css']
})
export class NewClientDialogComponent implements OnInit {

  addAClientForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<NewClientDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceUser:UtilisateurService, private serviceClient:ClientService) { 
      this.addAClientForm = bulder.group({
        nom: ['', Validators.required],
        prenoms: ['', Validators.required],
        tel: ['', Validators.required],
        dateNaissance: [''],
        lieuNaissance: [''],
        situationMatri: [''],
        profession: [''],
        villeResidence: ['', Validators.required],
        sexe: ['M', Validators.required],
        photo: [''],
        autresInfos: ['']

      })
  }

  ngOnInit(): void {
  }

  onValiderClientSaveClicked(){
    let newPers:Personne = new Personne(this.addAClientForm.value['nom'], this.addAClientForm.value['prenoms'],
    this.addAClientForm.value['sexe'], this.addAClientForm.value['dateNaissance'],
    this.addAClientForm.value['lieuNaissance'], this.addAClientForm.value['situationMatri'], 
    this.addAClientForm.value['profession'], this.addAClientForm.value['villeResidence'], 
    this.addAClientForm.value['tel'], this.addAClientForm.value['autresInfos']);
    
    this.serviceUser.addAPersonne(newPers).subscribe(
      (data) => {
        let newClient:Client = new Client(data);
        this.serviceClient.addAClient(newClient).subscribe(
          (data2) => {
            this.dialogRef.close(true);
            this.toastr.success('Enrégistrement effectué avec Succès', 'Nouveau Client');
          },
          (erreur) => {
            console.log('Erreur lors de l\'Ajout du Client.', erreur);
            this.toastr.error('Erreur lors de l\'Ajout du Client.\n Code : '+erreur.status+' | '+erreur.statusText, 'Client');
          }
        );

      },
      (erreur) => {
        console.log('Erreur lors de l\'Ajout de Personne.', erreur);
        this.toastr.error('Erreur lors de l\'Ajout de Personne.\n Code : '+erreur.status+' | '+erreur.statusText, 'Client');
      }
    );
    
    

  }

}

