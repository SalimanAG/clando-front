import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agence } from 'models/agence.model';
import { Depense } from 'models/depense.model';
import { MotifDepense } from 'models/motifDepense.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { TypesDepenseService } from 'services/administration/types-depense.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { DepensesService } from 'services/enregistrement/depenses.service';
import { DialogDepenseData1 } from '../listes-depense.component';

@Component({
  selector: 'app-edit-depense-dialog',
  templateUrl: './edit-depense-dialog.component.html',
  styleUrls: ['./edit-depense-dialog.component.css']
})
export class EditDepenseDialogComponent implements OnInit {

  editADepenseForm:FormGroup;
  typesDepense: MotifDepense[] = [];
  agences: Agence[] = [];

  constructor(public dialogRef: MatDialogRef<EditDepenseDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceUser:UtilisateurService, private serviceTypeDepense: TypesDepenseService, 
    private serviceUserAgence: AssociationService, private serviceDepense: DepensesService, 
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogDepenseData1) { 
      this.editADepenseForm = bulder.group({
        beneficiaire: [dialogData.depense.beneficiaire, Validators.required],
        dateDep: [dialogData.depense.dateDep, Validators.required],
        montant: [dialogData.depense.montant, Validators.required],
        motif: [dialogData.depense.motif?.codeMoD, Validators.required],
        agence: [dialogData.depense.agence?.codAgence, Validators.required],
        description: [dialogData.depense.description],

      })
  }

  ngOnInit(): void {
    this.getAllAgence();
    this.getAllTypeDepenses();
  }

  getAllTypeDepenses(){
    
    this.serviceTypeDepense.getAllMotifDepenses().subscribe(
      (data) => {
        this.typesDepense = data;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Type de Dépense', erreur);
        
      }
    );
  }

  getAllAgence(){
    
    this.serviceUserAgence.getAllAssocier().subscribe(
      (data) => {
        //this.typesDepense = data;
        let tab: Agence[] = [];
        data.forEach(element => {
          if(element.pers.idPers == this.serviceUser.connectedUser.personne.idPers){
            tab.push(element.agence);
          }
        });

        this.agences = tab;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Agences', erreur);
        
      }
    );
  }

  onValiderDepenseEditClicked(){

    const i = this.agences.findIndex(l => l.codAgence == this.editADepenseForm.value['agence']);
    const j = this.typesDepense.findIndex(l => l.codeMoD == this.editADepenseForm.value['motif']);

    let agen: Agence = null;
    let typ: MotifDepense = null;

    if(i>-1){
      agen = this.agences[i];      
    }

    if(j>-1){
      typ = this.typesDepense[j];      
    }


    let newDep:Depense = new Depense(null, this.editADepenseForm.value['dateDep'], this.editADepenseForm.value['beneficiaire'], 
    this.editADepenseForm.value['description'], this.editADepenseForm.value['montant'], true, null, 
    typ, agen);
    
    this.serviceDepense.editADepense(this.dialogData.depense.numDep.toString(), newDep).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastr.success('Modification effectuée avec Succès', 'Modifier Dépense');

      },
      (erreur) => {
        console.log('Erreur lors de l\'Ajout de la Dépense.', erreur);
        this.toastr.error('Erreur lors de la modification de la Dépense.\n Code : '+erreur.status+' | '+erreur.statusText, 'Dépense');
      }
    );
    
    

  }

}
