import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Objet } from 'models/objet.model';
import { ToastrService } from 'ngx-toastr';
import { ObjetsTontineService } from 'services/repertoire/objets-tontine.service';
import { EditObjetTontineDialogComponent } from './edit-objet-tontine-dialog/edit-objet-tontine-dialog.component';
import { NewObjetTontineDialogComponent } from './new-objet-tontine-dialog/new-objet-tontine-dialog.component';




export interface DialogObjTontData1 {
  objTonti: Objet;
}



@Component({
  selector: 'app-objets-tontine',
  templateUrl: './objets-tontine.component.html',
  styleUrls: ['./objets-tontine.component.css']
})
export class ObjetsTontineComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['code', 'libelle', 'composition', 'natureLot', 'action'];
  dataSource: MatTableDataSource<Objet>;
  objetsTontine: Objet[] = [];
  isLoadingResults:boolean = false;
  isLoadingPage:boolean = true;
  deleteObjetTontine: Objet = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog:MatDialog, private serviceObjet:ObjetsTontineService, private toastr: ToastrService) {
    
    this.getAllObjets();
    
  }
  ngOnInit(): void {
    this.isLoadingPage = true;
  }

  ngAfterViewInit() {
    this.isLoadingPage = false;
  }

  getAllObjets(){
    this.isLoadingResults = true;
    this.serviceObjet.getAllObjets().subscribe(
      (data) => {
        this.objetsTontine = data;
        this.dataSource = new MatTableDataSource(this.objetsTontine);
        //console.log(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.isLoadingResults = false;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Objets de Tontine', erreur);
        this.isLoadingResults = false;
        this.toastr.error('Objet de Tontine', 'Erreur lors de récupération de la liste des Objets de Tontine.\n Code : '+erreur.status+' | '+erreur.statusText);
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

  onNewObjetBottonClicked(){
    let dialog = this.dialog.open(NewObjetTontineDialogComponent);
    dialog.afterClosed().subscribe(result => {
      this.getAllObjets();
      //console.log(result);
    });
  }

  onModifAObjetClicked(objet1:Objet){
    let dat: DialogObjTontData1 = {objTonti: objet1, };
    
    let dialog = this.dialog.open(EditObjetTontineDialogComponent, {
      data: dat, 

    });
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.getAllObjets();

    });
  }

  onDeleteAObjetClicked(objet:Objet){
    
    this.deleteObjetTontine = objet;
  }

  

  onConfirmObjetTontiDelet(): void {
    
    this.serviceObjet.deleteAObjet(this.deleteObjetTontine.idObjet.toString()).subscribe(
      (data) => {
        this.toastr.success('Suppression effectuée avec Succès', 'Objets de Tontine');
        this.getAllObjets();
      },
      (erreur) => {
        console.log('Erreur lors de la Suppression de l\'Objet de Tontine.', erreur);
        this.toastr.error('Erreur lors de la Suppression de l\'Objet de Tontine.\n Code : '+erreur.status+' | '+erreur.statusText, 'Objets de Tontine');

      }
    );
  }


  onAnnulerUserDeleteClicked(): void {
    console.log('Annuler')
  }

}

