import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Affecter } from 'models/affecter.model';
import { Carnet } from 'models/carnet.model';
import { Client } from 'models/client.model';
import { Collecteur } from 'models/collecteur.model';
import { Objet } from 'models/objet.model';
import { OpCaisse } from 'models/opcaisse.model';
import { Tontine } from 'models/tontine.model';
import { TypeOpCaisse } from 'models/typeop.model';
import { UserCaisse } from 'models/userCaisse.model';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { OperCaisseService } from 'services/enregistrement/oper-caisse.service';
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
  carnets: Carnet[] = [];
  clients: Client[] = [];
  collecteurs: Collecteur[] = [];
  objetsTontine: Objet[] = [];
  userCaisses: UserCaisse[] = [];

  constructor(public dialogRef: MatDialogRef<NewTontineDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceTontine: TontineService, public asso: AssociationService,
    private serviceClient: ClientService, private serviceCollecteur: AgentsCollecteurService, 
    private serviceObjetTonti: ObjetsTontineService, public user : UtilisateurService,
    private ops: OperCaisseService)  { 
      this.addATontineForm = bulder.group({
        cais: [this.userCaisses[0], Validators.required],
        mise: ['', Validators.required],
        dateDebut: [moment(Date.now()).format('YYYY-MM-DD'), Validators.required],
        dateFin: [moment(Date.now()).format('YYYY-MM-DD')],
        collecteur: ['', Validators.required],
        carnet: ['', Validators.required],
        clt: ['', Validators.required],
        objet: ['', Validators.required],

      })

      this.getAllCaisses();
      this.getAllClient();
      this.getAllCollecteur();
      this.getAllObjetsTontine();
      this.getAllCarnets();
  }

  getAllCaisses(){
    this.asso.getAllUserCaisse().subscribe(
      (data) => {
        this.userCaisses = data.filter(uc=>uc.utilisateur.idUser == this.user.connectedUser.idUser &&
          uc.dateDepart == null);
        
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Caisse.', erreur);
        this.toastr.error('Erreur lors de la récupération de la liste des Objets de Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'caisse');
      }
    );
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


  getAllCarnets(){
    this.serviceTontine.getAllCarnet().subscribe(
      (data) => {
        this.carnets = data;
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

  onValiderTontineSaveClicked(){
        /*let op:OpCaisse=new OpCaisse(this.addATontineForm.value['dateDebut'],
        new TypeOpCaisse('2', 'Vente de carnet','Recette'),
        1,true,new Date(),this.user.connectedUser, this.addATontineForm.value['cais'].caisse);
        console.log(op);*/        
    /*let newCarnet= new Carnet(this.addATontineForm.value['carnet'],
      this.addATontineForm.value['mise'], false,this.addATontineForm.value['objet'], 
      this.addATontineForm.value['collecteur'],this.addATontineForm.value['clt'], 
      this.addATontineForm.value['cais'].caisse.agence,null);
    
    this.serviceTontine.addACarnet(newCarnet).subscribe(
      dataCarnet=>{
        
        /*this.ops.addAnOpCaisse(op).subscribe(
          dataOp=>{
        let newTontine: Tontine = new Tontine(this.addATontineForm.value['dateDebut'],
            this.addATontineForm.value['dateDebut'],true,dataCarnet,
              this.addATontineForm.value['mise']);
              this.serviceTontine.addATontine(newTontine).subscribe(
                (dataTontine) => {
                  this.serviceTontine.addAnAffecter(
                    new Affecter(this.addATontineForm.value['datedebut'],true,
                      this.addATontineForm.value['collecteur'],dataTontine)).subscribe(
                      data=>{
                        this.dialogRef.close(true);
                        this.toastr.success('Enrégistrement effectué avec Succès', 
                          'Nouvelle Tontine');
                      },
                      errAffect=>{
                        console.log(errAffect);                  
                      });
                  },
                  (erreurTon) => {
                    console.log('Erreur lors de l\'Ajout de Tontine.', erreurTon);
                    this.toastr.error('Erreur lors de l\'Ajout de Tontine.\n Code : '+erreurTon.status+' | '+erreurTon.statusText, 'Utilisateurs');
                  }
                );
          },
          erreurOp=>{
            this.toastr.warning('Enregistrement échoué','Tontine');
            console.log('erreur opération de caisse', erreurOp);
            
          }
        );
/*},
      (erreurCarnet) => {
        console.log('Erreur lors de l\'Ajout de Tontine.', erreurCarnet);
        this.toastr.error('Erreur lors de l\'Ajout de Tontine.\n Code : '+erreurCarnet.status+' | '+erreurCarnet.statusText, 'Utilisateurs');
      }
    );*/
  }

}
