import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Caisse } from 'models/caisse.model';
import { UserCaisse } from 'models/userCaisse.model';
import { Utilisateur } from 'models/utilisataeur.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { CaissiereService } from 'services/repertoire/caissiere.service';
import { DialogUserCaisseData1 } from '../user-to-caisse.component';

@Component({
  selector: 'app-edit-asso-user-caisse-dialog',
  templateUrl: './edit-asso-user-caisse-dialog.component.html',
  styleUrls: ['./edit-asso-user-caisse-dialog.component.css']
})
export class EditAssoUserCaisseDialogComponent implements OnInit {

  editAAssoUserToCaisseForm:FormGroup;
  utilisateurs: Utilisateur[] = [];
  caisses: Caisse[] = [];

  constructor(public dialogRef: MatDialogRef<EditAssoUserCaisseDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder,  private serviceUser:UtilisateurService, 
    private serviceUserAgence: AssociationService, private serviceCaisse: CaissiereService, 
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogUserCaisseData1) { 
      this.editAAssoUserToCaisseForm = bulder.group({
        user: ['', Validators.required],
        caisse: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: [''],
        motifDepart: [''],
        
      })



  }

  ngOnInit(): void {
  }

  /*
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

  */

  onValiderAssoUserToCaisseEditClicked(){

    let newAssoUserCaisse: UserCaisse = new UserCaisse(this.editAAssoUserToCaisseForm.value['dateDebut'], this.editAAssoUserToCaisseForm.value['dateFin'],
    this.editAAssoUserToCaisseForm.value['motifDepart'], this.dialogData.userCaisse.caisse, this.dialogData.userCaisse.utilisateur);
    //console.log('obj', newAssoUserAgence);
    this.serviceUserAgence.editAUserCaisse(this.dialogData.userCaisse.idUserCaisse.toString(), newAssoUserCaisse).subscribe(
      (data) => {
        
        this.dialogRef.close(true);
        this.toastr.success('Modificatio de l\'Association Utilisateur - Caisse effectué avec Succès', 'Modifier Association');

      },
      (erreur) => {
        console.log('Erreur lors de l\'Ajout de l\'Association Utilisateur - Caisse.', erreur);
        this.toastr.error('Erreur lors de la Modification de l\'Association Utilisateur - Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
      }
    );
    
    

  }

}
