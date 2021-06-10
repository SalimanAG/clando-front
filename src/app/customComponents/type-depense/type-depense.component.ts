import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MotifDepense } from 'models/motifDepense.model';
import { ToastrService } from 'ngx-toastr';
import { TypesDepenseService } from 'services/administration/types-depense.service';
import { EditTypeDepenseDialogComponent } from './edit-type-depense-dialog/edit-type-depense-dialog.component';
import { NewTypeDepenseDialogComponent } from './new-type-depense-dialog/new-type-depense-dialog.component';




export interface DialogTypeDepenseData1 {
  typeDepense: MotifDepense;
}



@Component({
  selector: 'app-type-depense',
  templateUrl: './type-depense.component.html',
  styleUrls: ['./type-depense.component.css']
})
export class TypeDepenseComponent  implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['code', 'libelle', 'action'];
  dataSource: MatTableDataSource<MotifDepense>;
  typesDepense: MotifDepense[] = [];
  isLoadingResults:boolean = false;
  isLoadingPage:boolean = true;
  deleteTypeDepense: MotifDepense = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog:MatDialog, private serviceTypeDepense:TypesDepenseService, private toastr: ToastrService) {
    
    this.getAllTypeDepenses();
    
  }
  ngOnInit(): void {
    this.isLoadingPage = true;
  }

  ngAfterViewInit() {
    this.isLoadingPage = false;
  }

  getAllTypeDepenses(){
    this.isLoadingResults = true;
    this.serviceTypeDepense.getAllMotifDepenses().subscribe(
      (data) => {
        this.typesDepense = data;
        this.dataSource = new MatTableDataSource(this.typesDepense);
        //console.log(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.isLoadingResults = false;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Type de Dépense', erreur);
        this.isLoadingResults = false;
        this.toastr.error('Erreur lors de récupération de la liste des Type de Dépense.\n Code : '+erreur.status+' | '+erreur.statusText, 'Objet de Tontine');
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

  onNewTypeDepenseBottonClicked(){
    let dialog = this.dialog.open(NewTypeDepenseDialogComponent);
    dialog.afterClosed().subscribe(result => {
      this.getAllTypeDepenses();

    });
  }

  onModifATypeDepenseClicked(typeDepense1:MotifDepense){
    let dat: DialogTypeDepenseData1 = {typeDepense: typeDepense1, };
    
    let dialog = this.dialog.open(EditTypeDepenseDialogComponent, {
      data: dat, 

    });
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.getAllTypeDepenses();

    });
  }

  onDeleteATypeDepenseClicked(typeDepense:MotifDepense){
    
    this.deleteTypeDepense = typeDepense;
  }

  

  onConfirmTypeDepenseDelet(): void {
    
    this.serviceTypeDepense.deleteAObjet(this.deleteTypeDepense.codeMoD.valueOf()).subscribe(
      (data) => {
        this.toastr.success('Suppression effectuée avec Succès', 'Type Dépense');
        this.getAllTypeDepenses();
      },
      (erreur) => {
        console.log('Erreur lors de la Suppression du Type de Dépense.', erreur);
        this.toastr.error('Erreur lors de la Suppression du Type de Dépense.\n Code : '+erreur.status+' | '+erreur.statusText, 'Type Dépense');

      }
    );
  }


  onAnnulerTypeDepenseDeleteClicked(): void {
    console.log('Annuler')
  }

}

