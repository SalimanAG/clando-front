import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Agence } from 'models/agence.model';
import { Associer } from 'models/associer.model';
import { Utilisateur } from 'models/utilisataeur.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { AgenceService } from 'services/repertoire/agence.service';

@Component({
  selector: 'app-new-asso-user-to-agence-dialog',
  templateUrl: './new-asso-user-to-agence-dialog.component.html',
  styleUrls: ['./new-asso-user-to-agence-dialog.component.css']
})
export class NewAssoUserToAgenceDialogComponent implements OnInit {

  addAAssoUserToAgenceForm:FormGroup;
  utilisateurs: Utilisateur[] = [];
  agences: Agence[] = [];

  constructor(public dialogRef: MatDialogRef<NewAssoUserToAgenceDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder,  private serviceUser:UtilisateurService, 
    private serviceUserAgence: AssociationService, private serviceAgence: AgenceService, 
    ) { 
      this.addAAssoUserToAgenceForm = bulder.group({
        user: ['', Validators.required],
        agence: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: [''],
        
      })

      this.getAllUtilisateur();
      this.getAllAgence();

  }

  ngOnInit(): void {
  }

  getAllUtilisateur(){
    //this.isLoadingResults = true;
    this.serviceUser.getAllUtilisateurs().subscribe(
      (data) => {
        this.utilisateurs = data;
        //this.dataSource = new MatTableDataSource(this.utilisateurs);
        console.log(data);
        

        //this.isLoadingResults = false;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Utilisateurs', erreur);
        //this.isLoadingResults = false;
        this.toastr.error('Erreur lors de la récupération de liste des Utilisateurs.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
      }
    );
  }

  getAllAgence(){
    //this.isLoadingResults = true;
    this.serviceAgence.getAllAgences().subscribe(
      (data) => {
        this.agences = data;
        //this.dataSource = new MatTableDataSource(this.utilisateurs);
        console.log(data);

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Agences', erreur);
        //this.isLoadingResults = false;
        this.toastr.error('Erreur lors de la récupération de liste des Agences.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
      }
    );
  }

  onValiderAssoUserToAgenceSaveClicked(){

    let newAssoUserAgence: Associer = new Associer(this.addAAssoUserToAgenceForm.value['dateDebut'], this.addAAssoUserToAgenceForm.value['dateFin'],
    this.addAAssoUserToAgenceForm.value['agence'], this.addAAssoUserToAgenceForm.value['user'].personne);
    //console.log('obj', newAssoUserAgence);
    this.serviceUserAgence.addAAssocier(newAssoUserAgence).subscribe(
      (data) => {
        
        this.dialogRef.close(true);
        this.toastr.success('Enrégistrement de l\'Association Utilisateur - Agence effectué avec Succès', 'Nouvelle Association');

      },
      (erreur) => {
        console.log('Erreur lors de l\'Ajout de l\'Association Utilisateur - Agence.', erreur);
        this.toastr.error('Erreur lors de l\'Ajout de l\'Association Utilisateur - Agence.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
      }
    );
    
    

  }

}
