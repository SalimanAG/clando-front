import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agence } from 'models/agence.model';
import { Caisse } from 'models/caisse.model';
import { ToastrService } from 'ngx-toastr';
import { CaissiereService } from 'services/repertoire/caissiere.service';
import { AgenceService } from 'services/repertoire/agence.service';
import { DialogTontineData1 } from '../caissieres.component';

@Component({
  selector: 'app-edit-caisse-dialog',
  templateUrl: './edit-caisse-dialog.component.html',
  styleUrls: ['./edit-caisse-dialog.component.css']
})
export class EditCaisseDialogComponent implements OnInit, AfterViewInit  { 

  editLCaisseForm:FormGroup;
  objetsAgence: Agence[] = [];
  objetCaisse: Caisse[] = [];

  constructor(public dialogRef: MatDialogRef<EditCaisseDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private servicecaisse: CaissiereService, 
    private serviceAgence: AgenceService,
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogTontineData1) { 
      this.editLCaisseForm = bulder.group({
        code: ['', Validators.required],
        libelle: ['', Validators.required],
        agence: ['', Validators.required],
        

      })

      this.getAllAgence();
      this.getAllCaisse();

    }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
   

  }

  getAllAgence(){
    this.serviceAgence.getAllAgences().subscribe(
      (data) => {
        this.objetsAgence = data;
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Agences.', erreur);
        this.toastr.error('Erreur lors de la récupération de la liste des Agences.\n Code : '+erreur.status+' | '+erreur.statusText, 'Agences');
      }
    );
  }

  getAllCaisse(){
    this.servicecaisse.getAllCaisse().subscribe(
      (data) => {
        this.objetCaisse = data;
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Caisse.', erreur);
        this.toastr.error('Erreur lors de la récupération de la liste des Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'Caisses');
      }
    );
  }

  onValiderCaisseSaveClicked(){
   
    let agenceupdated:Agence = null;

    for (const agen of this.objetsAgence){
      if(agen.codAgence == this.editLCaisseForm.value['agence']){
        agenceupdated = agen;
        break;
      }
    }


    let newCaisse: Caisse = new Caisse(this.editLCaisseForm.value['codeCaisse'], this.editLCaisseForm.value['libelle'],
    agenceupdated);
    
    this.servicecaisse.editCaisse(this.dialogData.caisse.codeCaisse.valueOf(), newCaisse).subscribe(
      (data) => {
        
        this.dialogRef.close(true);
        this.toastr.success('Modifiaction effectuée avec Succès', 'Modifier Caisse');

      },
      (erreur) => {
        console.log('Erreur lors de la Modification de la Caisse.', erreur);
        this.toastr.error('Erreur lors de la Modification de la Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'Caisse');
      }
    );
    
    

  }

}
