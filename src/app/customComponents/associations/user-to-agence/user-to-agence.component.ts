import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Agence } from 'models/agence.model';
import { Associer } from 'models/associer.model';
import { Utilisateur } from 'models/utilisataeur.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { AgenceService } from 'services/repertoire/agence.service';
import { EditAssoUserToAgenceDialogComponent } from './edit-asso-user-to-agence-dialog/edit-asso-user-to-agence-dialog.component';
import { NewAssoUserToAgenceDialogComponent } from './new-asso-user-to-agence-dialog/new-asso-user-to-agence-dialog.component';



export interface DialogUserAgenceData1 {
  associer: Associer;
  user: Utilisateur;
}


@Component({
  selector: 'app-user-to-agence',
  templateUrl: './user-to-agence.component.html',
  styleUrls: ['./user-to-agence.component.css']
})
export class UserToAgenceComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['code', 'utilisateur', 'agence', 'dateDeDebut', 'dateDeFin', 'action'];
  dataSource: MatTableDataSource<Associer>;
  associers: Associer[] = [];
  utilisateurs: Utilisateur[] = [];
  agences: Agence[] = [];
  isLoadingResults:boolean = false;
  deleteUtilisateurAgence: Associer = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog:MatDialog, private serviceUser:UtilisateurService, private toastr: ToastrService, 
    private serviceUserAgence: AssociationService, private serviceAgence: AgenceService) {
    
    this.getAllUtilisateur();
    this.getAllAgence();
    this.getAllAssocier();
    
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

  getAllAssocier(){
    this.isLoadingResults = true;
    this.serviceUserAgence.getAllAssocier().subscribe(
      (data) => {
        this.associers = data;
        this.dataSource = new MatTableDataSource(this.associers);
        console.log(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.isLoadingResults = false;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Associations', erreur);
        this.isLoadingResults = false;
        this.toastr.error('Erreur lors de la récupération de liste des Associations d\'Utilisateurs à Agence.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
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
        

        //this.isLoadingResults = false;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Agences', erreur);
        //this.isLoadingResults = false;
        this.toastr.error('Erreur lors de la récupération de liste des Agences.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
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

  onNewUserAgenceBottonClicked(){
    let dialog = this.dialog.open(NewAssoUserToAgenceDialogComponent);
    dialog.afterClosed().subscribe(result => {
      this.getAllAssocier();
      console.log(result);
    });
  }

  onModifAUserAgenceClicked(associ:Associer){

    let concernedUser: Utilisateur = null;

    for(const user of this.utilisateurs){
      if(user.personne.idPers == associ.pers.idPers){
        concernedUser = user;
        break;
      }
    }

    let dat: DialogUserAgenceData1 = {associer: associ, user: concernedUser, };
    
    let dialog = this.dialog.open(EditAssoUserToAgenceDialogComponent, {
      data: dat, 

    });
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.getAllAssocier();

    });
  }

  onDeleteAUserClicked(associ:Associer){
    //console.log(user);
    this.deleteUtilisateurAgence = associ;
  }

  /*onInfosAUserClicked(user1:Utilisateur){
    //console.log(user);
    let dat: DialogData1 = {user: user1, };
    
    let dialog = this.dialog.open(DetailUserDialogComponent, {
      data: dat, 

    });
  }*/

  onConfirmUserAgenceDelet(): void {
    console.log(this.deleteUtilisateurAgence);
    
    this.serviceUserAgence.deleteAAssocier(this.deleteUtilisateurAgence.idAssocier.toString()).subscribe(
      (data) => {
        this.toastr.success('Suppression de l\'Association Utilisateur Agence effectuée avec Succès', 'Association');
        this.getAllAssocier();
      },
      (erreur) => {
        console.log('Erreur lors de la Suppression de Personne.', erreur);
        this.toastr.error('Erreur lors de la Suppression de l\'Association Utilisateur Agence.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');

      }
    );


  }


  onAnnulerUserAgenceDeleteClicked(): void {
    console.log('Annuler')
  }

}
