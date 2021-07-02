import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Carnet } from 'models/carnet.model';
import { Client } from 'models/client.model';
import { Collecteur } from 'models/collecteur.model';
import { Objet } from 'models/objet.model';
import { Tontine } from 'models/tontine.model';
import { ToastrService } from 'ngx-toastr';
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';
import { ClientService } from 'services/repertoire/client.service';
import { ObjetsTontineService } from 'services/repertoire/objets-tontine.service';
import { TontineService } from 'services/repertoire/tontine.service';
import { DialogTontineData1 } from '../tontines.component';



@Component({
  selector: 'app-edit-tontine-dialog',
  templateUrl: './edit-tontine-dialog.component.html',
  styleUrls: ['./edit-tontine-dialog.component.css']
})
export class EditTontineDialogComponent implements OnInit, AfterViewInit {

  editATontineForm:FormGroup;
  clients: Client[] = [];
  carnets: Carnet[] = [];
  collecteurs: Collecteur[] = [];
  objetsTontine: Objet[] = [];

  constructor(public dialogRef: MatDialogRef<EditTontineDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceTontine: TontineService, 
    private serviceClient: ClientService, private serviceCollecteur: AgentsCollecteurService, 
    private serviceObjetTonti: ObjetsTontineService,
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogTontineData1) { 
      this.editATontineForm = bulder.group({
        /*numTont: ['', Validators.required],
        carnet: ['', Validators.required],
        mise: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: [''],
        collecteur: ['', Validators.required],
        clt: ['', Validators.required],
        objet: ['', Validators.required],*/

      })

      this.getAllClient();
      this.getAllCollecteur();
      this.getAllObjetsTontine();
      this.getAllCarnet();

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
  }

  getAllClient(){
    this.serviceClient.getAllClients().subscribe(
      (data) => {
        this.clients = data;
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Clients.', erreur);
        this.toastr.error('Erreur lors de la récupération de la liste des Clients.\n Code : '+erreur.status+' | '+erreur.statusText, 'Tontines');
      }
    );
  }

  getAllCollecteur(){
    this.serviceCollecteur.getAllCollecteurs().subscribe(
      (data) => {
        this.collecteurs = data;
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Collecteurs.', erreur);
        this.toastr.error('Erreur lors de la récupération de la liste des Collecteurs.\n Code : '+erreur.status+' | '+erreur.statusText, 'Tontines');
      }
    );
  }

  getAllObjetsTontine(){
    this.serviceObjetTonti.getAllObjets().subscribe(
      (data) => {
        this.objetsTontine = data;
        console.log(this.objetsTontine);        
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Objets de Tontine.', erreur);
        this.toastr.error('Erreur lors de la récupération de la liste des Objets de Tontine.\n Code : '+erreur.status+' | '+erreur.statusText, 'Tontines');
      }
    );
  }

  getAllCarnet(){
    this.serviceTontine.getAllCarnet().subscribe(
      (data) => {
        this.carnets = data;
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Objets de Tontine.', erreur);
        this.toastr.error('Erreur lors de la récupération de la liste des Objets de Tontine.\n Code : '+erreur.status+' | '+erreur.statusText, 'Tontines');
      }
    );
  }

  onValiderTontineSaveClicked(){    
    if(this.editATontineForm.value['carnet'] == this.dialogData.tontine.carnet.idCarnet){
     // let maTontine=new Tontine()
    }
    else{
      this.toastr.info('Autre carnet');
    }
    /*
        numTont: ['', Validators.required],
        mise: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: [''],
        collecteur: ['', Validators.required],
        clt: ['', Validators.required],
        objet: ['', Validators.required],
    *//*
    let collec:Collecteur = null;
    let obj:Objet = null;
    let client:Client = null;

    for (const col of this.collecteurs){
      if(col.idCollecteur == this.editATontineForm.value['collecteur']){
        collec = col;
        break;
      }
    }

    for (const cli of this.clients){
      if(cli.idClt == this.editATontineForm.value['clt']){
        client = cli;
        break;
      }
    }

    for (const objTon of this.objetsTontine){
      if(objTon.idObjet == this.editATontineForm.value['objet']){
        obj = objTon;
        break;
      }
    }

    let newTontine: Tontine = new Tontine(this.editATontineForm.value['carnet'], this.editATontineForm.value['mise'],
    this.editATontineForm.value['dateDebut'], this.editATontineForm.value['dateFin'],
    collec);
    
    this.serviceTontine.editATontine(this.dialogData.tontine.numTont.toString(), newTontine).subscribe(
      (data) => {
        
        this.dialogRef.close(true);
        this.toastr.success('Modifiaction effectuée avec Succès', 'Modifier Tontine');

      },
      (erreur) => {
        console.log('Erreur lors de la Modification de la Tontine.', erreur);
        this.toastr.error('Erreur lors de la Modification de la Tontine.\n Code : '+erreur.status+' | '+erreur.statusText, 'Tontine');
      }
    );
    
    
*/
  }

}
