import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Associer } from 'models/associer.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { AgenceService } from 'services/repertoire/agence.service';
import { DialogUserAgenceData1 } from '../user-to-agence.component';

@Component({
  selector: 'app-edit-asso-user-to-agence-dialog',
  templateUrl: './edit-asso-user-to-agence-dialog.component.html',
  styleUrls: ['./edit-asso-user-to-agence-dialog.component.css']
})
export class EditAssoUserToAgenceDialogComponent implements OnInit {

  editAAssoUserToAgenceForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<EditAssoUserToAgenceDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder,  private serviceUser:UtilisateurService, 
    private serviceUserAgence: AssociationService, private serviceAgence: AgenceService, 
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogUserAgenceData1) { 
      this.editAAssoUserToAgenceForm = bulder.group({
        user: ['', Validators.required],
        agence: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: [''],
        
      })


  }

  ngOnInit(): void {
  }



  onValiderAssoUserToAgenceEditClicked(){

    let newAssoUserAgence: Associer = new Associer(this.editAAssoUserToAgenceForm.value['dateDebut'], this.editAAssoUserToAgenceForm.value['dateFin'],
    this.dialogData.associer.agence, this.dialogData.associer.pers);
    //console.log('obj', newAssoUserAgence);
    this.serviceUserAgence.editAAssocier(this.dialogData.associer.idAssocier.toString() ,newAssoUserAgence).subscribe(
      (data) => {
        
        this.dialogRef.close(true);
        this.toastr.success('Modification de l\'Association Utilisateur - Agence effectuée avec Succès', 'Modifier Association');

      },
      (erreur) => {
        console.log('Erreur lors de la Modification de l\'Association Utilisateur - Agence.', erreur);
        this.toastr.error('Erreur lors de la Modification de l\'Association Utilisateur - Agence.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
      }
    );
    
    

  }

}
