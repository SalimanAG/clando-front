import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Client } from 'models/client.model';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { ClientService } from 'services/repertoire/client.service';
import { DetailClientDialogComponent } from './detail-client-dialog/detail-client-dialog.component';
import { EditClientDialogComponent } from './edit-client-dialog/edit-client-dialog.component';
import { NewClientDialogComponent } from './new-client-dialog/new-client-dialog.component';



export interface DialogClientData1 {
  client: Client;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['login', 'nom', 'prenoms', 'tel', 'actif', 'action'];
  dataSource: MatTableDataSource<Client>;
  clients: Client[] = [];
  isLoadingResults:boolean = false;
  isLoadingPage:boolean = true;
  deleteClient: Client = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog:MatDialog, private serviceUser:UtilisateurService, 
    private toastr: ToastrService, private serviceClient:ClientService) {
    
    this.getAllClient();
    
  }
  ngOnInit(): void {
    this.isLoadingPage = true;
  }

  ngAfterViewInit() {
    this.isLoadingPage = false;
  }

  getAllClient(){
    this.isLoadingResults = true;
    this.serviceClient.getAllClients().subscribe(
      (data) => {
        this.clients = data;
        this.dataSource = new MatTableDataSource(this.clients);
        console.log(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.isLoadingResults = false;

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Clients', erreur);
        this.isLoadingResults = false;
        this.toastr.error('Clients', 'Erreur lors de la récupération de liste des Clients.\n Code : '+erreur.status+' | '+erreur.statusText);
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

  onNewClientBottonClicked(){
    let dialog = this.dialog.open(NewClientDialogComponent);
    dialog.afterClosed().subscribe(result => {
      this.getAllClient();
      console.log(result);
    });
  }

  onModifAClientClicked(client1:Client){
    let dat: DialogClientData1 = {client: client1, };
    
    let dialog = this.dialog.open(EditClientDialogComponent, {
      data: dat, 

    });
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.getAllClient();

    });
  }

  onDeleteAClientClicked(client:Client){
    //console.log(user);
    this.deleteClient = client;
  }

  onInfosAClientClicked(client1:Client){
    //console.log(user);
    let dat: DialogClientData1 = {client: client1, };
    
    let dialog = this.dialog.open(DetailClientDialogComponent, {
      data: dat, 

    });
  }

  onConfirmClientDelet(): void {
    console.log(this.deleteClient);
    this.serviceClient.deleteAClient(this.deleteClient.idClt.toString()).subscribe(
      (data) => {
        this.serviceUser.deleteAPersonne(this.deleteClient.personne.idPers.toString()).subscribe(
          (data2) => {
            this.toastr.success('Suppression effectuée avec Succès', 'Client');
            this.getAllClient();
          },
          (erreur) => {
            console.log('Erreur lors de la Suppression de Personne.', erreur);
            this.toastr.error('Erreur lors de la Suppression de Personne.\n Code : '+erreur.status+' | '+erreur.statusText, 'Client');

          }
        );
      },
      (erreur) => {
        console.log('Erreur lors de la Suppression du Client.', erreur);
        this.toastr.error('Erreur lors de la Suppression du Client.\n Code : '+erreur.status+' | '+erreur.statusText, 'Client');

      }
    );
  }


  onAnnulerClientDeleteClicked(): void {
    console.log('Annuler')
  }

}

