import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {Caisse} from 'models/caisse.model';
import { Agence } from 'models/agence.model';
import { Utilisateur } from 'models/utilisataeur.model';
import { CaissiereService } from 'services/repertoire/caissiere.service';
import { AgenceService } from 'services/repertoire/agence.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';

@Component({
  selector: 'app-new-oper-caisse-dialog',
  templateUrl: './new-oper-caisse-dialog.component.html',
  styleUrls: ['./new-oper-caisse-dialog.component.css']
})
export class NewOperCaisseDialogComponent implements OnInit {

  addOpCaisseForm:FormGroup;
  objetsAgence: Agence[] = [];
  objetsCaisse: Caisse[] = [];
  objetsUser: Utilisateur[] = [];

  constructor(public dialogRef: MatDialogRef<NewOperCaisseDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceCaisse: CaissiereService, private serviceUser: UtilisateurService,
    private serviceAgence: AgenceService) { 
      this.addOpCaisseForm = bulder.group({
        dateOp: [Date.now(), Validators.required],
        typeOp: ['', Validators.required],
        caisse: [0, Validators.required],
        user: [0, Validators.required],
        
      })
      this.getAllCaisse();
      this.getAllUser();
    }

  ngOnInit(): void {
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

  getAllUser(){
    this.serviceUser.getAllUtilisateurs().subscribe(
      (data) => {
        this.objetsUser = data;
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Utilisateurs.', erreur);
        this.toastr.error('Erreur lors de la récupération de la liste des Objets de Utilisateur.\n Code : '+erreur.status+' | '+erreur.statusText, 'caisse');
      }
    );
  }

}
