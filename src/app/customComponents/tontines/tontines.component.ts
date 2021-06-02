import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Client } from 'models/client.model';
import { Collecteur } from 'models/collecteur.model';
import { Tontine } from 'models/tontine.model';
import { ToastrService } from 'ngx-toastr';
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';
import { ClientService } from 'services/repertoire/client.service';
import { TontineService } from 'services/repertoire/tontine.service';
import { CalendarTontineDialogComponent } from './calendar-tontine-dialog/calendar-tontine-dialog.component';
import { DetailTontineDialogComponent } from './detail-tontine-dialog/detail-tontine-dialog.component';
import { EditTontineDialogComponent } from './edit-tontine-dialog/edit-tontine-dialog.component';
import { NewTontineDialogComponent } from './new-tontine-dialog/new-tontine-dialog.component';


export interface DialogTontineData1 {
  tontine: Tontine;
}


@Component({
  selector: 'app-tontines',
  templateUrl: './tontines.component.html',
  styleUrls: ['./tontines.component.css']
})
export class TontinesComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['numTontine', 'mise', 'dateDebut', 'collecteur', 'client', 'objet', 'action'];
  dataSource: MatTableDataSource<Tontine>;
  tontines: Tontine[] = [];
  clients: Client[] = [];
  collecteurs: Collecteur[] = [];
  isLoadingResults:boolean = false;
  isLoadingPage:boolean = true;
  deleteTontine: Tontine = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog:MatDialog, private serviceTontine: TontineService, 
    private serviceClient: ClientService, private serviceCollecteur: AgentsCollecteurService, 
    private toastr: ToastrService) {
    
    this.getAllTontine();
    
  }
  ngOnInit(): void {
    this.isLoadingPage = true;
  }

  ngAfterViewInit() {
    this.isLoadingPage = false;
  }

  getAllTontine(){
    this.isLoadingResults = true;
    this.serviceTontine.getAllTontines().subscribe(
      (data) => {
        this.tontines = data;
        this.dataSource = new MatTableDataSource(this.tontines);
        console.log(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.isLoadingResults = false;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Tontines', erreur);
        this.isLoadingResults = false;
        this.toastr.error('Tontines', 'Erreur lors de la récupération de liste des Tontines.\n Code : '+erreur.status+' | '+erreur.statusText);
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

  onNewTontineBottonClicked(){
    let dialog = this.dialog.open(NewTontineDialogComponent);
    dialog.afterClosed().subscribe(result => {
      this.getAllTontine();
      console.log(result);
    });
  }

  onModifATontineClicked(tontine1: Tontine){
    let dat: DialogTontineData1 = {tontine: tontine1, };
    
    let dialog = this.dialog.open(EditTontineDialogComponent, {
      data: dat, 

    });
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.getAllTontine();

    });
  }

  onDeleteATontineClicked(tontine: Tontine){
    //console.log(user);
    this.deleteTontine = tontine;
  }

  onInfosATontineClicked(tontine1: Tontine){
    //console.log(user);
    let dat: DialogTontineData1 = {tontine: tontine1, };
    
    let dialog = this.dialog.open(DetailTontineDialogComponent, {
      data: dat, 

    });
  }

  onCalendarATontineClicked(tontine1: Tontine){
    //console.log(user);
    let dat: DialogTontineData1 = {tontine: tontine1, };
    
    let dialog = this.dialog.open(CalendarTontineDialogComponent, {
      data: dat, 

    });
  }

  onConfirmTontineDelet(): void {
    console.log(this.deleteTontine);
    this.serviceTontine.deleteATontine(this.deleteTontine.numTont.toString()).subscribe(
      (data) => {

        this.toastr.success('Suppression effectuée avec Succès', 'Tontines');
        this.getAllTontine();
          
      },
      (erreur) => {
        console.log('Erreur lors de la Suppression de la Tontine.', erreur);
        this.toastr.error('Erreur lors de la Suppression de la Tontine.\n Code : '+erreur.status+' | '+erreur.statusText, 'Tontines');

      }
    );
  }



}
