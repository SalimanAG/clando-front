import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { Personne } from 'models/personne.model';
import { DialogClientData1 } from '../clients.component';
import { ClientService } from 'services/repertoire/client.service';
import { Client } from 'models/client.model';

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrls: ['./edit-client-dialog.component.css']
})
export class EditClientDialogComponent implements OnInit {

  editAClientForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<EditClientDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceUser:UtilisateurService, private serviceClient:ClientService,
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogClientData1) { 
      this.editAClientForm = bulder.group({
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

  onValiderClientEditClicked(){

    let newPers:Personne = new Personne(this.editAClientForm.value['nom'], this.editAClientForm.value['prenoms'],
    this.editAClientForm.value['sexe'], this.editAClientForm.value['dateNaissance'],
    this.editAClientForm.value['lieuNaissance'], this.editAClientForm.value['situationMatri'], 
    this.editAClientForm.value['profession'], this.editAClientForm.value['villeResidence'], 
    this.editAClientForm.value['tel'], this.editAClientForm.value['autresInfos']);
    
    this.serviceUser.editAPersonne(this.dialogData.client.personne.idPers.toString(), newPers).subscribe(
      (data) => {
        let newClient:Client = new Client(data);
        this.serviceClient.editAClient(this.dialogData.client.idClt.toString(), newClient).subscribe(
          (data2) => {
            this.dialogRef.close(true);
            this.toastr.success('Modification effectuée avec Succès', 'Modifier Client');
          },
          (erreur) => {
            console.log('Erreur lors de la Modification du Client.', erreur);
            this.toastr.error('Erreur lors de la Modification du Client.\n Code : '+erreur.status+' | '+erreur.statusText, 'Client');
          }
        );

      },
      (erreur) => {
        console.log('Erreur lors de la Modification de Personne.', erreur);
        this.toastr.error('Erreur lors de la Modification de Personne.\n Code : '+erreur.status+' | '+erreur.statusText, 'Utilisateurs');
      }
    );
    
  }

}
