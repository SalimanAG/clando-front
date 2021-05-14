import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Utilisateur } from 'models/utilisataeur.model';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { NewUserDialogComponent } from './new-user-dialog/new-user-dialog.component';



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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog:MatDialog, private serviceUser:UtilisateurService, private toastr: ToastrService) {
    
    this.getAllUtilisateur();
    
  }
  ngOnInit(): void {
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

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onNewUserBottonClicked(){
    let dialog = this.dialog.open(NewUserDialogComponent);
    dialog.afterClosed().subscribe(result => {
      this.getAllUtilisateur();
    });
  }

}

