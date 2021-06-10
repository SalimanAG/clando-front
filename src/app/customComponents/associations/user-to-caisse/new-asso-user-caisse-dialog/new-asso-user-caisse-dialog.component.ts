import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Caisse } from 'models/caisse.model';
import { UserCaisse } from 'models/userCaisse.model';
import { Utilisateur } from 'models/utilisataeur.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { CaissiereService } from 'services/repertoire/caissiere.service';

@Component({
  selector: 'app-new-asso-user-caisse-dialog',
  templateUrl: './new-asso-user-caisse-dialog.component.html',
  styleUrls: ['./new-asso-user-caisse-dialog.component.css']
})
export class NewAssoUserCaisseDialogComponent implements OnInit {

  addAAssoUserToCaisseForm:FormGroup;
  utilisateurs: Utilisateur[] = [];
  caisses: Caisse[] = [];

  constructor(public dialogRef: MatDialogRef<NewAssoUserCaisseDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder,  private serviceUser:UtilisateurService, 
    private serviceUserAgence: AssociationService, private serviceCaisse: CaissiereService, 
    ) { 
      this.addAAssoUserToCaisseForm = bulder.group({
        user: ['', Validators.required],
        caisse: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: [''],
        motifDepart: [''],
        
      })

      this.getAllUtilisateur();
      this.getAllCaisse();

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

  getAllCaisse(){
    //this.isLoadingResults = true;
    this.serviceCaisse.getAllCaisse().subscribe(
      (data) => {
        this.caisses = data;
        //this.dataSource = new MatTableDataSource(this.utilisateurs);
        //console.log(data);

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Caisses', erreur);
        //this.isLoadingResults = false;
        this.toastr.error('Erreur lors de la récupération de liste des Caisses.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
      }
    );
  }

  onValiderAssoUserToCaisseSaveClicked(){

    let newAssoUserCaisse: UserCaisse = new UserCaisse(this.addAAssoUserToCaisseForm.value['dateDebut'], this.addAAssoUserToCaisseForm.value['dateFin'],
    this.addAAssoUserToCaisseForm.value['motifDepart'], this.addAAssoUserToCaisseForm.value['caisse'], this.addAAssoUserToCaisseForm.value['user']);
    //console.log('obj', newAssoUserAgence);
    this.serviceUserAgence.addAUserCaisse(newAssoUserCaisse).subscribe(
      (data) => {
        
        this.dialogRef.close(true);
        this.toastr.success('Enrégistrement de l\'Association Utilisateur - Caisse effectué avec Succès', 'Nouvelle Association');

      },
      (erreur) => {
        console.log('Erreur lors de l\'Ajout de l\'Association Utilisateur - Caisse.', erreur);
        this.toastr.error('Erreur lors de l\'Ajout de l\'Association Utilisateur - Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
      }
    );
    
    

  }

}
