import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Agence } from 'models/agence.model';
import { ToastrService } from 'ngx-toastr';
import { AgenceService } from 'services/repertoire/agence.service';
import { EditingAgenceDlgComponent } from './editing-agence-dlg/editing-agence-dlg.component'
import { AddingAgenceDlgComponent } from './adding-agence-dlg/adding-agence-dlg.component';
import { from } from 'rxjs';
import { FileDetector } from 'selenium-webdriver';

export interface dialogAgence {
  agce: Agence;
}

@Component({
  selector: 'app-agences',
  templateUrl: './agences.component.html',
  styleUrls: ['./agences.component.css']
})
export class AgencesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['code', 'libelle', 'datCreation', 'adresse', 'action'];
  dataSource: MatTableDataSource<Agence>;
  agences: Agence[] = [];
  isLoadingResults:boolean = false;
  isLoadingPage:boolean = true;
  agenceToDelete: Agence = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public aser: AgenceService, public dlg: MatDialog, public info: ToastrService, 
    public detector : ChangeDetectorRef) { 
    this.chargerAgences();
  }

  ngOnInit(): void {
    this.isLoadingPage = true;
  }

  ngAfterViewInit() {
    this.isLoadingPage = false;
    this.detector.detectChanges();
  }

  chargerAgences(){
    this.isLoadingResults = true;
    this.aser.getAllAgences().subscribe(
      (data) => {
        this.agences = data;
        this.dataSource = new MatTableDataSource(this.agences);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des agences', erreur);
        this.isLoadingResults = false;
        this.info.error('Agence', 'Erreur lors de récupération de la liste des des agences.\n Code : '+erreur.status+' | '+erreur.statusText);
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

  addingAgence(){
    let dialog = this.dlg.open(AddingAgenceDlgComponent);
    dialog.afterClosed().subscribe(result => {
      this.chargerAgences();
    });
  }

  editingAgence(ag: Agence){
    console.log(ag);
    
    let dat: dialogAgence = {agce: ag, };
    console.log(dat.agce);
    
    let dialog = this.dlg.open(EditingAgenceDlgComponent, {
      data: dat, 

    });
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.chargerAgences();

    });
  }

  deletingAgence(ag : Agence){
    this.agenceToDelete=ag;
    this.info.warning('Prêt pour suppression de '+ag.libAgence);
    
  }

  confirmDelete(){
    this.aser.deleteAnAgence(this.agenceToDelete.codAgence.toString()).subscribe(
      (data) => {
        this.info.success('Suppression effectuée avec Succès', 'Suppression d\'agence');
        this.chargerAgences();
      },
      (erreur) => {
        console.log('Erreur lors de la Suppression de l\'agence.', erreur);
        this.info.error('Erreur lors de la Suppression de l\'Objet de Tontine.\n Code : '+erreur.status+' | '+erreur.statusText, 'Objets de Tontine');

      }
    );
    }


}
