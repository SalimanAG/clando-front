import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {Caisse} from 'models/caisse.model';
import { Agence } from 'models/agence.model';
import { Utilisateur } from 'models/utilisataeur.model';
import autoTable from 'jspdf-autotable';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { Collecteur } from 'models/collecteur.model';
import { Collecte } from 'models/collecte.model';
import { Affecter } from 'models/affecter.model';
import { TontineService } from 'services/repertoire/tontine.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';
import * as moment from 'moment';
import { OpCaisse } from 'models/opcaisse.model';
import { TypeOpCaisse } from 'models/typeop.model';
import { OperCaisseService } from 'services/enregistrement/oper-caisse.service';
import jsPDF from 'jspdf';
import { AssociationService } from 'services/administration/association.service';
import { Associer } from 'models/associer.model';
import { DialogPdfViewData1, PdfViewerComponent } from 'app/customComponents/pdf-viewer/pdf-viewer.component';
import { UserCaisse } from 'models/userCaisse.model';
import { ucs2 } from 'punycode';

@Component({
  selector: 'app-new-oper-caisse-dialog',
  templateUrl: './new-oper-caisse-dialog.component.html',
  styleUrls: ['./new-oper-caisse-dialog.component.css']
})
export class NewOperCaisseDialogComponent implements OnInit {

  addOpCaisseForm:FormGroup;
  objetsAgence: Agence[] = [];
  objetsCaisse: Caisse[] = [];
  collecteurs: Collecteur[] = [];
  collecteursV: Collecteur[] = [];
  collecte: Collecte[] = [];
  associations: Associer[] = [];
  affectations: Affecter[] = [];
  collTon: Affecter[] = [];
  userCaisses : UserCaisse[]=[];
  total : number = 0;
  @ViewChild(MatSort) maSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['carn', 'clt', 'mise','nbre','mtt', 'action'];
  dataSource: MatTableDataSource<Collecte>;
  
  
  constructor(public dialogRef: MatDialogRef<NewOperCaisseDialogComponent>, 
    private bulder: FormBuilder, private serTon: TontineService, private user: UtilisateurService,
    public serCol : AgentsCollecteurService, public asso: AssociationService, public dlg :MatDialog,
    public servOp: OperCaisseService, public tst: ToastrService, private detect: ChangeDetectorRef,) { 
      this.getAllAssociation();
      this.getCaisses();
      this.getAllAffecter();
      //this.getAllCollecteur();
      this.addOpCaisseForm = bulder.group({
        dateOp: [moment(Date.now()).format('YYYY-MM-DDTHH:mm'), Validators.required],
        dateCol: [moment(Date.now()).format('YYYY-MM-DD'), Validators.required],
        col: ['', Validators.required],
        caisse: [0, Validators.required],
        nbM: [, Validators.required],
        datCol: [moment(Date.now()).format('YYYY-MM-DD'), Validators.required]
      })
    }

  ngOnInit(): void {
  }

  getAllAssociation(){
    this.asso.getAllAssocier().subscribe(
      (data) => {
        this.associations = data;
        
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Caisse.', erreur);
        this.tst.error('Erreur lors de la récupération de la liste des Objets de Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'caisse');
      }
    );
  }

  filtreCollecteur(){
    let cais = this.addOpCaisseForm.value['caisse'];
    this.asso.getAllAssocier().subscribe(
      (data) => {
        this.associations = data;
        let assoVal= this.associations.filter(a=>a.agence.codAgence == 
          cais.agence.codAgence && a.datFin == null);
        this.serCol.getAllCollecteurs().subscribe(
        (data) => {
          this.collecteurs = data;
          this.collecteursV= this.collecteurs.filter(c=>
            assoVal.map(as=>as.pers.idPers).indexOf(c.personne.idPers)>=0);
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Caisse.', erreur);
        this.tst.error('Erreur lors de la récupération de la liste des Objets de Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'caisse');
      }
    );
      });
  }

  getCaisses(){
    this.asso.getAllUserCaisse().subscribe(
      (data) => {
        this.objetsCaisse = data.filter(uc=>uc.dateDepart == null &&  uc.utilisateur.idUser == this.user.connectedUser.idUser).map(a=>a.caisse);
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Caisse.', erreur);
        this.tst.error('Erreur lors de la récupération de la liste des Objets de Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'caisse');
      }
    );
  }

  getAllAffecter(){
    this.serTon.getAllAffecter().subscribe(
      (data) => {
        this.affectations = data;
        //let affVal = this.affectations.filter(a=>a.)
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Utilisateurs.', erreur);
        this.tst.error('Erreur lors de la récupération de la liste des Objets de Utilisateur.\n Code : '+erreur.status+' | '+erreur.statusText, 'caisse');
      }
    );
  }

  prepareCollecte(){
    let col = this.addOpCaisseForm.value['col'];
    
    this.collecte=[];
    this.collTon = this.affectations.filter(a=>a.collecteur.idCollecteur == col.idCollecteur);
    this.collTon.forEach(elt => {
      this.collecte.push(new Collecte(null,0,elt.tontine,elt.collecteur,null));
    });
    this.dataSource=new MatTableDataSource(this.collecte);
    this.detect.detectChanges();
  }

  recalculer(){
    this.total  = 0;
    this.collecte.forEach(elt => {
      this.total += elt.tontine.carnet.mise * elt.nbreMise;
    });
}

onBlur(event : Event){
  console.log('FFFF');
  
}

  save(){
    let op:OpCaisse=new OpCaisse(this.addOpCaisseForm.value['dateOp'],
      new TypeOpCaisse('2', 'Centralisation de collecte','Recette'),
      1,true,new Date(),this.user.connectedUser, this.addOpCaisseForm.value['caisse']);
    if(this.addOpCaisseForm.value['dateOp']!=null && this.addOpCaisseForm.value['caisse']!= null)
    {
      this.servOp.addAnOpCaisse(op).subscribe(
        data=>{
          let fact=[];
          let lignes=[];
          this.collecte.forEach(elt => {
            elt.opcaisse = data;
            elt.dateCollecte = new Date(this.addOpCaisseForm.value['dateCol']);
            this.serCol.addACollecte(elt).subscribe(
              datacollecte=>{
                let col=[];
                col.push(elt.tontine.carnet.idCarnet);
                col.push(elt.tontine.carnet.client.personne.nomPers+' '+
                        elt.tontine.carnet.client.personne.prePers);
                col.push(moment(new Date(elt.dateCollecte)).format('DD/MM/YYYY'));
                col.push(elt.tontine.carnet.mise);
                col.push(elt.nbreMise);
                col.push(elt.nbreMise*elt.tontine.carnet.mise);
                lignes.push(col);
                this.collecte.splice(this.collecte.indexOf(elt),1);
                if(this.collecte.length == 0){

                  this.tst.success("Centralisation effectuée avec succès", 
                    'Centralisation');
                    console.log(fact);
                    
                  let facture = new jsPDF();
                  facture.text(""+data.caisse.agence.libAgence, 15,15);
                  facture.text('Collecteur: '+this.addOpCaisseForm.value['col'].
                  personne.nomPers+' '+this.addOpCaisseForm.value['col'].personne.prePers,
                  15,45);
                  facture.text("Reçu de reversement des colletes du "+this.addOpCaisseForm.value['datCol'],20,25);
                  autoTable(facture, {
                    theme: 'grid',
                    head: [['Carnet', 'Client', 'Date de collecte', 'Mise', 'Nb. mise', 'Montant']],
                    headStyles: {
                      fillColor: [41, 128, 185],
                      textColor: 255,
                      fontStyle: 'bold',
                    },
                    margin: { top: 60 },
                    body: lignes,
                  });
                  autoTable(facture, {
                    theme: 'grid',
                    margin: { top: 0, left: 30, right: 5 },
                    columnStyles: {
                      0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', fontSize: 8 },
                    },
                    body: [
                      ['Total reversé', 2050]
                    ],
                    bodyStyles: {
                      fontSize: 8,
                      cellPadding: 1,
                    },
                  });
                  let imprime : DialogPdfViewData1
                  imprime={pdf : facture, nomFile: 'Imprim'}
                  this.dlg.open(PdfViewerComponent,{width:'80%', data:imprime});
                }
              },
              errcol=>{
                console.log('erreu de collecte');
                
              }
            );
          });
        },
        erre=>{
          this.tst.error('Echec de la centralisation','Centralisation');
        }
      );
    }
  }
}
