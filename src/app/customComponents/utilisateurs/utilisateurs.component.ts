import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Utilisateur } from 'models/utilisataeur.model';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { DetailUserDialogComponent } from './detail-user-dialog/detail-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { NewUserDialogComponent } from './new-user-dialog/new-user-dialog.component';



export interface DialogData1 {
  user: Utilisateur;
}

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['login', 'nom', 'prenoms', 'tel', 'actif', 'action'];
  dataSource: MatTableDataSource<Utilisateur>;
  utilisateurs: Utilisateur[] = [];
  isLoadingResults:boolean = false;
  isLoadingPage:boolean = true;
  deleteUtilisateur: Utilisateur = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog:MatDialog, private serviceUser:UtilisateurService, private toastr: ToastrService) {
    
    this.getAllUtilisateur();
    
  }
  ngOnInit(): void {
    this.isLoadingPage = true;
  }

  ngAfterViewInit() {
    this.isLoadingPage = false;
  }

  getAllUtilisateur(){
    this.isLoadingResults = true;
    this.serviceUser.getAllUtilisateurs().subscribe(
      (data) => {
        this.utilisateurs = data;
        this.dataSource = new MatTableDataSource(this.utilisateurs);
        console.log(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.isLoadingResults = false;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Utilisateurs', erreur);
        this.isLoadingResults = false;
        this.toastr.error('Utilisateurs', 'Erreur lors de la récupération de liste des Utilisateurs.\n Code : '+erreur.status+' | '+erreur.statusText);
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

  onNewUserBottonClicked(){
    let dialog = this.dialog.open(NewUserDialogComponent);
    dialog.afterClosed().subscribe(result => {
      this.getAllUtilisateur();
      console.log(result);
    });
  }

  onModifAUserClicked(user1:Utilisateur){
    let dat: DialogData1 = {user: user1, };
    
    let dialog = this.dialog.open(EditUserDialogComponent, {
      data: dat, 

    });
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.getAllUtilisateur();

    });
  }

  onDeleteAUserClicked(user:Utilisateur){
    //console.log(user);
    this.deleteUtilisateur = user;
  }

  onInfosAUserClicked(user1:Utilisateur){
    //console.log(user);
    let dat: DialogData1 = {user: user1, };
    
    let dialog = this.dialog.open(DetailUserDialogComponent, {
      data: dat, 

    });
  }

  onConfirmUserDelet(): void {
    console.log(this.deleteUtilisateur);
    this.serviceUser.deleteAUtilisateur(this.deleteUtilisateur.idUser.toString()).subscribe(
      (data) => {
        this.serviceUser.deleteAPersonne(this.deleteUtilisateur.personne.idPers.toString()).subscribe(
          (data2) => {
            this.toastr.success('Suppression effectuée avec Succès', 'Utilisateur');
            this.getAllUtilisateur();
          },
          (erreur) => {
            console.log('Erreur lors de la Suppression de Personne.', erreur);
            this.toastr.error('Erreur lors de la Suppression de Personne.\n Code : '+erreur.status+' | '+erreur.statusText, 'Utilisateurs');

          }
        );
      },
      (erreur) => {
        console.log('Erreur lors de la Suppression de l\'Utilisateur.', erreur);
        this.toastr.error('Erreur lors de la Suppression de l\'Utilisateur.\n Code : '+erreur.status+' | '+erreur.statusText, 'Utilisateurs');

      }
    );
  }


  onAnnulerUserDeleteClicked(): void {
    console.log('Annuler')
  }

}

