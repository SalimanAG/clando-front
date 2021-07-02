import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Agence } from 'models/agence.model';
import { Depense } from 'models/depense.model';
import { MotifDepense } from 'models/motifDepense.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { TypesDepenseService } from 'services/administration/types-depense.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { DepensesService } from 'services/enregistrement/depenses.service';

@Component({
  selector: 'app-new-depense-dialog',
  templateUrl: './new-depense-dialog.component.html',
  styleUrls: ['./new-depense-dialog.component.css']
})
export class NewDepenseDialogComponent implements OnInit {

  addADepenseForm:FormGroup;
  typesDepense: MotifDepense[] = [];
  agences: Agence[] = [];

  constructor(public dialogRef: MatDialogRef<NewDepenseDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceUser:UtilisateurService, private serviceTypeDepense: TypesDepenseService, 
    private serviceUserAgence: AssociationService, private serviceDepense: DepensesService) { 
      this.addADepenseForm = bulder.group({
        beneficiaire: ['', Validators.required],
        dateDep: ['', Validators.required],
        montant: ['', Validators.required],
        motif: ['', Validators.required],
        agence: ['', Validators.required],
        description: [''],

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

  onValiderDepenseSaveClicked(){

    let newDep:Depense = new Depense(null, this.addADepenseForm.value['dateDep'], this.addADepenseForm.value['beneficiaire'], 
    this.addADepenseForm.value['description'], this.addADepenseForm.value['montant'], true, null, 
    this.addADepenseForm.value['motif'], this.addADepenseForm.value['agence']);
    
    this.serviceDepense.saveADepense(newDep).subscribe(
      (data) => {

        this.dialogRef.close(true);
        this.toastr.success('Enrégistrement effectué avec Succès', 'Nouvelle Dépense');

      },
      (erreur) => {
        console.log('Erreur lors de l\'Ajout de la Dépense.', erreur);
        this.toastr.error('Erreur lors de l\'Ajout de la Dépense.\n Code : '+erreur.status+' | '+erreur.statusText, 'Dépense');
      }
    );
    
    

  }

}
