import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Caisse } from 'models/caisse.model';
import { UserCaisse } from 'models/userCaisse.model';
import { Utilisateur } from 'models/utilisataeur.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { CaissiereService } from 'services/repertoire/caissiere.service';
import { EditAssoUserCaisseDialogComponent } from './edit-asso-user-caisse-dialog/edit-asso-user-caisse-dialog.component';
import { NewAssoUserCaisseDialogComponent } from './new-asso-user-caisse-dialog/new-asso-user-caisse-dialog.component';



export interface DialogUserCaisseData1 {
  userCaisse: UserCaisse;
  user: Utilisateur;
}



@Component({
  selector: 'app-user-to-caisse',
  templateUrl: './user-to-caisse.component.html',
  styleUrls: ['./user-to-caisse.component.css']
})
export class UserToCaisseComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['code', 'utilisateur', 'caisse', 'dateDeDebut', 'dateDeFin','motifDepart', 'action'];
  dataSource: MatTableDataSource<UserCaisse>;
  userCaisses: UserCaisse[] = [];
  utilisateurs: Utilisateur[] = [];
  caisses: Caisse[] = [];
  isLoadingResults:boolean = false;
  deleteUtilisateurCaisse: UserCaisse = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog:MatDialog, private serviceUser:UtilisateurService, private toastr: ToastrService, 
    private serviceUserAgence: AssociationService, private serviceCaisse: CaissiereService) {
    
    this.getAllUtilisateur();
    this.getAllCaisse();
    this.getAllUserCaisse();
    
  }
  ngOnInit(): void {
    //this.isLoadingPage = true;
  }

  ngAfterViewInit() {
    //this.isLoadingPage = false;
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

  getAllUserCaisse(){
    this.isLoadingResults = true;
    this.serviceUserAgence.getAllUserCaisse().subscribe(
      (data) => {
        this.userCaisses = data;
        this.dataSource = new MatTableDataSource(this.userCaisses);
        console.log(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.isLoadingResults = false;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des UserCaisses', erreur);
        this.isLoadingResults = false;
        this.toastr.error('Erreur lors de la récupération de liste des Associations d\'Utilisateurs à Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
      }
    );
  }

  getAllCaisse(){
    //this.isLoadingResults = true;
    this.serviceCaisse.getAllCaisse().subscribe(
      (data) => {
        this.caisses = data;
        //this.dataSource = new MatTableDataSource(this.utilisateurs);
        console.log(data);
        

        //this.isLoadingResults = false;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Caisses', erreur);
        //this.isLoadingResults = false;
        this.toastr.error('Erreur lors de la récupération de liste des Caisses.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
      }
    );
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    console.log(this.dataSource);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onNewUserCaisseBottonClicked(){
    let dialog = this.dialog.open(NewAssoUserCaisseDialogComponent);
    dialog.afterClosed().subscribe(result => {
      this.getAllUserCaisse();
      //console.log(result);
    });
  }

  onModifAUserAgenceClicked(associ:UserCaisse){

    let concernedUser: Utilisateur = null;

    for(const user of this.utilisateurs){
      if(user.idUser == associ.utilisateur.idUser){
        concernedUser = user;
        break;
      }
    }

    let dat: DialogUserCaisseData1 = {userCaisse: associ, user: concernedUser, };
    
    let dialog = this.dialog.open(EditAssoUserCaisseDialogComponent, {
      data: dat, 

    });
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.getAllUserCaisse();

    });
  }

  onDeleteAUserClicked(associ:UserCaisse){
    //console.log(user);
    this.deleteUtilisateurCaisse = associ;
  }

  /*onInfosAUserClicked(user1:Utilisateur){
    //console.log(user);
    let dat: DialogData1 = {user: user1, };
    
    let dialog = this.dialog.open(DetailUserDialogComponent, {
      data: dat, 

    });
  }*/

  onConfirmUserCaisseDelet(): void {
    //console.log(this.deleteUtilisateurCaisse);
    
    this.serviceUserAgence.deleteAUserCaisse(this.deleteUtilisateurCaisse.idUserCaisse.toString()).subscribe(
      (data) => {
        this.toastr.success('Suppression de l\'Association Utilisateur Caisse effectuée avec Succès', 'Association');
        this.getAllUserCaisse();
      },
      (erreur) => {
        console.log('Erreur lors de la Suppression de Personne.', erreur);
        this.toastr.error('Erreur lors de la Suppression de l\'Association Utilisateur Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');

      }
    );


  }


  onAnnulerUserCaisseDeleteClicked(): void {
    console.log('Annuler')
  }

}
