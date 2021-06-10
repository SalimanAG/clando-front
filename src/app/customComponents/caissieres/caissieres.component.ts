import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Agence } from 'models/agence.model';
import { Caisse } from 'models/caisse.model';
import { ToastrService } from 'ngx-toastr';
import { CaissiereService } from 'services/repertoire/caissiere.service';
import { AgenceService } from 'services/repertoire/agence.service';
import { EditCaisseDialogComponent } from './edit-caisse-dialog/edit-caisse-dialog.component';
import { NewCaisseDialogComponent} from './new-caisse-dialog/new-caisse-dialog.component';

export interface DialogTontineData1 {
  caisse: Caisse;
}

@Component({
  selector: 'app-caissieres',
  templateUrl: './caissieres.component.html',
  styleUrls: ['./caissieres.component.css']
})
export class CaissieresComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['codeCaisse', 'libeCaisse', 'agence', 'action'];
  dataSource: MatTableDataSource<Caisse>;
  caisse: Caisse[] = [];
  agence: Agence[] = [];
  isLoadingResults:boolean = false;
  isLoadingPage:boolean = true;
  deleteCaisse: Caisse = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog:MatDialog, private serviceCaisse: CaissiereService, 
    private serviceAgence: AgenceService, private toastr: ToastrService) {

      this.getAllcaisse();

     }

    ngOnInit(): void {
      this.isLoadingPage = true;
    }
  
    ngAfterViewInit() {
      this.isLoadingPage = false;
    }

    getAllcaisse(){
      this.isLoadingResults = true;
      this.serviceCaisse.getAllCaisse().subscribe(
        (data) => {
          this.caisse = data;
          this.dataSource = new MatTableDataSource(this.caisse);
          console.log(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
  
          this.isLoadingResults = false;
  
        },
        (erreur) => {
          console.log('Erreur lors de récupération de la liste des Caisse', erreur);
          this.isLoadingResults = false;
          this.toastr.error('Caisses', 'Erreur lors de la récupération de liste des Caisses.\n Code : '+erreur.status+' | '+erreur.statusText);
        }
      );
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //console.log(this.dataSource.filter);
    //console.log(this.dataSource);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onNewcaisseBottonClicked(){
    let dialog = this.dialog.open(NewCaisseDialogComponent);
    dialog.afterClosed().subscribe(result => {
      this.getAllcaisse();
      console.log(result);
    });
  }

  onDeleteCaisseClicked(caisse: Caisse){
    //console.log(user);
    this.deleteCaisse = caisse;
  }

  onConfirmCaisseDelet(): void {
    console.log(this.deleteCaisse);
    this.serviceCaisse.deleteCaisse(this.deleteCaisse.codeCaisse.toString()).subscribe(
      (data) => {

        this.toastr.success('Suppression effectuée avec Succès', 'Caisses');
        this.getAllcaisse();
          
      },
      (erreur) => {
        console.log('Erreur lors de la Suppression de la Caisse.', erreur);
        this.toastr.error('Erreur lors de la Suppression de la Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'Tontines');

      }
    );
  }

  onModifLCaisseClicked(caisse1: Caisse){
    let dat: DialogTontineData1 = {caisse: caisse1, };
    
    let dialog = this.dialog.open(EditCaisseDialogComponent, {
      data: dat, 

    });
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.getAllcaisse();

    });
  }


}
