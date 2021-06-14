import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Client } from 'models/client.model';
import { Collecteur } from 'models/collecteur.model';
import { Confirmer } from 'models/confirmer.model';
import { Ramassage } from 'models/ramassage.model';
import { Tontine } from 'models/tontine.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';
import { ClientService } from 'services/repertoire/client.service';
import { TontineService } from 'services/repertoire/tontine.service';
import { CalendarTontineDialogComponent } from './calendar-tontine-dialog/calendar-tontine-dialog.component';
import { DetailTontineDialogComponent } from './detail-tontine-dialog/detail-tontine-dialog.component';
import { EditTontineDialogComponent } from './edit-tontine-dialog/edit-tontine-dialog.component';
import { NewRamassageComponent } from './new-ramassage/new-ramassage.component';
import { NewTontineDialogComponent } from './new-tontine-dialog/new-tontine-dialog.component';
import { ServirTontineComponent } from './servir-tontine/servir-tontine.component';


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
  tontineValable: Tontine[] = [];
  confirmations: Confirmer[] = [];
  ramassages: Ramassage[] = [];
  clients: Client[] = [];
  collecteurs: Collecteur[] = [];
  isLoadingResults:boolean = false;
  isLoadingPage:boolean = true;
  deleteTontine: Tontine = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog:MatDialog, private serviceTontine: TontineService, 
    private serviceClient: ClientService, private serviceCollecteur: AgentsCollecteurService, 
    private toastr: ToastrService, public detector : ChangeDetectorRef, public assos: AssociationService) {
    
    this.getAllTontine();
    this.getAllConfirmer();
    this.getAllRamassage();
    
  }
  ngOnInit(): void {
    this.isLoadingPage = true;
  }

  ngAfterViewInit() {
    this.isLoadingPage = false;
    this.detector.detectChanges();
  }

  getAllTontine(){
    this.isLoadingResults = true;
    this.serviceTontine.getAllTontines().subscribe(
      (data) => {
        this.tontines = data;
        this.tontineValable=this.tontines.filter(t=>t.servir == null);
        this.dataSource = new MatTableDataSource(this.tontineValable);
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

  getAllRamassage(){
    this.isLoadingResults = true;
    this.serviceTontine.getAllRamassage().subscribe(
      (data) => {
        this.ramassages = data;
      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des ramassages', erreur);
      }
    );
  }

  getAllConfirmer(){
    this.isLoadingResults = true;
    this.assos.getAllConfirmer().subscribe(
      (data) => {
        this.confirmations = data;
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

  oninitRam(tontine1: Tontine){
    if(this.ramassages.find(r=>r.tontine.numTont == tontine1.numTont) != null ){
      this.toastr.info('Il y a déja un ramassage enregistré pour la tontine');
    }
    else{
      let dat: DialogTontineData1 = {tontine: tontine1, };
      let dialog = this.dialog.open(NewRamassageComponent, {
        data: dat, 
      });
      dialog.afterClosed().subscribe(result => {
        if(result == true) this.getAllTontine();

      });
    }
    
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

  servir(tontine1 : Tontine ){
    let ram : Ramassage = this.ramassages.find(r=>r.tontine.numTont == tontine1.numTont);
    if(ram != null){
      if(ram.natLot == 'Nature' && ram.valider == true){
        let dat: DialogTontineData1 = {tontine: tontine1, };
        
        let dialog = this.dialog.open(ServirTontineComponent, {
          data: dat, 
        });
        dialog.afterClosed().subscribe(result => {
          if(result == true){
            this.getAllTontine();
          }

        });
      }
      else{
        this.toastr.info('Veuillez attendre la validation du ramassage de la tontine.', 'Servir une tontine');
      }
    }
    else{
      this.toastr.info('Veuillez initier le ramassage de la tontine.', 'Servir une tontine');
    }
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
