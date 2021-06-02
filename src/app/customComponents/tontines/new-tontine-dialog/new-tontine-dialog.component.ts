import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from 'models/client.model';
import { Collecteur } from 'models/collecteur.model';
import { Objet } from 'models/objet.model';
import { Tontine } from 'models/tontine.model';
import { ToastrService } from 'ngx-toastr';
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';
import { ClientService } from 'services/repertoire/client.service';
import { ObjetsTontineService } from 'services/repertoire/objets-tontine.service';
import { TontineService } from 'services/repertoire/tontine.service';


@Component({
  selector: 'app-new-tontine-dialog',
  templateUrl: './new-tontine-dialog.component.html',
  styleUrls: ['./new-tontine-dialog.component.css']
})
export class NewTontineDialogComponent implements OnInit {

  addATontineForm:FormGroup;
  clients: Client[] = [];
  collecteurs: Collecteur[] = [];
  objetsTontine: Objet[] = [];

  constructor(public dialogRef: MatDialogRef<NewTontineDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceTontine: TontineService, 
    private serviceClient: ClientService, private serviceCollecteur: AgentsCollecteurService, 
    private serviceObjetTonti: ObjetsTontineService) { 
      this.addATontineForm = bulder.group({
        numTont: ['', Validators.required],
        mise: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: [''],
        collecteur: ['', Validators.required],
        clt: ['', Validators.required],
        objet: ['', Validators.required],

      })

      this.getAllClient();
      this.getAllCollecteur();
      this.getAllObjetsTontine();

  }

  ngOnInit(): void {
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
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Objets de Tontine.', erreur);
        this.toastr.error('Erreur lors de la récupération de la liste des Objets de Tontine.\n Code : '+erreur.status+' | '+erreur.statusText, 'Tontines');
      }
    );
  }

  onValiderTontineSaveClicked(){
    /*
        numTont: ['', Validators.required],
        mise: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: [''],
        collecteur: ['', Validators.required],
        clt: ['', Validators.required],
        objet: ['', Validators.required],
    */
    let newTontine: Tontine = new Tontine(this.addATontineForm.value['numTont'], this.addATontineForm.value['mise'],
    this.addATontineForm.value['dateDebut'], this.addATontineForm.value['dateFin'],
    this.addATontineForm.value['collecteur'], this.addATontineForm.value['clt'], 
    this.addATontineForm.value['objet']);
    
    this.serviceTontine.addATontine(newTontine).subscribe(
      (data) => {
        
        this.dialogRef.close(true);
        this.toastr.success('Enrégistrement effectué avec Succès', 'Nouvelle Tontine');

      },
      (erreur) => {
        console.log('Erreur lors de l\'Ajout de Tontine.', erreur);
        this.toastr.error('Erreur lors de l\'Ajout de Tontine.\n Code : '+erreur.status+' | '+erreur.statusText, 'Utilisateurs');
      }
    );
    
    

  }

}
