import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {Caisse} from 'models/caisse.model';
import { Agence } from 'models/agence.model';
import { CaissiereService } from 'services/repertoire/caissiere.service';
import { AgenceService } from 'services/repertoire/agence.service';

@Component({
  selector: 'app-new-caisse-dialog',
  templateUrl: './new-caisse-dialog.component.html',
  styleUrls: ['./new-caisse-dialog.component.css']
})
export class NewCaisseDialogComponent implements OnInit {

  addLCaisseForm:FormGroup;
  objetsAgence: Agence[] = [];
  objetsCaisse: Caisse[] = [];

  constructor(public dialogRef: MatDialogRef<NewCaisseDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceCaisse: CaissiereService, 
    private serviceAgence: AgenceService) { 
      this.addLCaisseForm = bulder.group({
        code: ['', Validators.required],
        libelle: ['', Validators.required],
        agence: ['', Validators.required],
        
      })

      this.getAllAgence();
    }

  ngOnInit(): void {
  }

  getAllAgence(){
    this.serviceAgence.getAllAgences().subscribe(
      (data) => {
        this.objetsAgence = data;
        console.log("obj",this.objetsAgence);
        
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des agence.', erreur);
        this.toastr.error('Erreur lors de la récupération de la liste des Objets de agence.\n Code : '+erreur.status+' | '+erreur.statusText, 'Agence');
      }
    );
  }

  getAllCaisse(){
    this.serviceCaisse.getAllCaisse().subscribe(
      (data) => {
        this.objetsCaisse = data;
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Caisse.', erreur);
        this.toastr.error('Erreur lors de la récupération de la liste des Objets de Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'caisse');
      }
    );
  }

  onValiderCaisseSaveClicked(){
    let newCaisse:Caisse = new Caisse(this.addLCaisseForm.value['code'], this.addLCaisseForm.value['libelle'],
    this.addLCaisseForm.value['agence']);
    
    this.serviceCaisse.addCaisse(newCaisse).subscribe(
      (data) => {
        
        this.dialogRef.close(true);
        this.toastr.success('Enrégistrement effectué avec Succès', 'Nouvelle Caisse');

      },
      (erreur) => {
        console.log('Erreur lors de l\'Ajout de Caisse.', erreur);
        this.toastr.error('Erreur lors de l\'Ajout de Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'Caisse');
      }
    );
    
    

  }

}
