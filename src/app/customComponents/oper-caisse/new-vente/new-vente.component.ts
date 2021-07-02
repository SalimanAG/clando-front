import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Affecter } from 'models/affecter.model';
import { Agence } from 'models/agence.model';
import { Associer } from 'models/associer.model';
import { Caisse } from 'models/caisse.model';
import { Collecte } from 'models/collecte.model';
import { Collecteur } from 'models/collecteur.model';
import { OpCaisse } from 'models/opcaisse.model';
import { TypeOpCaisse } from 'models/typeop.model';
import { UserCaisse } from 'models/userCaisse.model';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { OperCaisseService } from 'services/enregistrement/oper-caisse.service';
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DialogPdfViewData1, PdfViewerComponent } from 'app/customComponents/pdf-viewer/pdf-viewer.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AssociationService } from 'services/administration/association.service';
import { Tontine } from 'models/tontine.model';
import { TontineService } from 'services/repertoire/tontine.service';
import { Carnet } from 'models/carnet.model';
import { Objet } from 'models/objet.model';
import { Client } from 'models/client.model';
import { ObjetsTontineService } from 'services/repertoire/objets-tontine.service';
import { data } from 'jquery';
import { ClientService } from 'services/repertoire/client.service';

@Component({
  selector: 'app-new-vente',
  templateUrl: './new-vente.component.html',
  styleUrls: ['./new-vente.component.css']
})
export class NewVenteComponent implements OnInit {

  addVenteForm:FormGroup;
  objetsAgence: Agence[] = [];
  objetsCaisse: Caisse[] = [];
  collecteurs: Collecteur[] = [];
  collecteursV: Collecteur[] = [];
  carnets: Carnet[] = [];
  objets: Objet[] = [];
  associations: Associer[] = [];
  affectations: Affecter[] = [];
  clients: Client[] = [];
  userCaisses : UserCaisse[]=[];
  total : number = 0;
  @ViewChild(MatSort) maSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['Num', 'clt', 'obj', 'mise', 'action'];
  dataSource: MatTableDataSource<Carnet>;
  constructor(public servOp: OperCaisseService, public user: UtilisateurService,
    public serCol : AgentsCollecteurService, public tst : ToastrService,
    public dlg: MatDialog, public bulder : FormBuilder, public asso : AssociationService,
    public obs: ObjetsTontineService, public clts: ClientService, 
    public dlgRef : MatDialogRef<NewVenteComponent>,
    public detetor: ChangeDetectorRef, public serTon: TontineService) { 
      this.getAllUC();
      this.getCaisses();
      this.getAllAffecter();
      this.getAutres();

      this.addVenteForm = bulder.group({
        dateOp: [moment(Date.now()).format('YYYY-MM-DDTHH:mm'), Validators.required],
        //mise : [0, Validators.required],
        col: ['', Validators.required],
        caisse: [0, Validators.required]
      });
    }

  ngOnInit(): void {
  }

  getAutres(){
    this.obs.getAllObjets().subscribe(
      data=>{
        this.objets=data;
      }
    );

    this.clts.getAllClients().subscribe(
      data=>{this.clients=data;}
    );
  }
  
  getAllUC(){
    this.asso.getAllUserCaisse().subscribe(
      (data) => {
        this.userCaisses = data;
        this.objetsCaisse = this.userCaisses.filter(
          a=>a.utilisateur.personne.idPers==this.user.connectedUser.idUser
          && a.dateDepart == null).map(c=>c.caisse);
      },
      (erreur) => {
        console.log('Erreur lors de la récupération de la liste des Caisse.', erreur);
        this.tst.error('Erreur lors de la récupération de la liste des Objets de Caisse.\n Code : '+erreur.status+' | '+erreur.statusText, 'caisse');
      }
    );
  }

  addCarnets(){    
    console.log(this.objets[0]);
    
    let carnet= new Carnet((new Date()).getFullYear().toString(), 0,false,
      this.objets[0], this.addVenteForm.value['col'],this.clients[0],
      this.addVenteForm.value['caisse'].agence,null);
      this.carnets.push(carnet);
      console.log(this.carnets);
    this.dataSource=new MatTableDataSource(this.carnets);
    this.detetor.detectChanges();
    this.total=this.carnets.length*200
  }

  removeCarnet(c : Carnet){
    this.carnets.splice(this.carnets.indexOf(c));
    this.dataSource=new MatTableDataSource(this.carnets);
    this.detetor.detectChanges();
    this.total=this.carnets.length*200
  }

  filtreCollecteur(){
    let cais = this.addVenteForm.value['caisse'];
    this.asso.getAllAssocier().subscribe(
      (data) => {
        this.associations = data;
        let assoVal= this.associations.filter(a=>a.agence.codAgence == 
          cais.agence.codAgence && a.datFin == null);
          console.log(assoVal);
        this.serCol.getAllCollecteurs().subscribe(
        (data) => {
          this.collecteurs = data;
          this.collecteursV=this.collecteurs.filter(c=>
            assoVal.map(asv=>asv.pers.idPers).indexOf(c.personne.idPers)>=0);
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


onBlur(event : Event){
}

  save(){
    let op:OpCaisse=new OpCaisse(this.addVenteForm.value['dateOp'],
      new TypeOpCaisse('1', 'Vente de carnet','Recette'),
      1,true,new Date(),this.user.connectedUser, this.addVenteForm.value['caisse']);
    if(this.addVenteForm.value['dateOp']!=null && this.addVenteForm.value['caisse']!= null)
    {
      this.servOp.addAnOpCaisse(op).subscribe(
        dataOp=>{
          let lignes=[];
          let col=[];
          col.push(this.carnets.length);
          col.push(300);
          col.push(this.carnets.length*300);
          lignes.push(col);
          let datf=new Date(dataOp.dateOp);
          datf.setDate(datf.getDate()+364);
          
          this.carnets.forEach(elt => {
            let car = new Carnet(elt.idCarnet,elt.mise,elt.dispo,
              elt.objet,this.addVenteForm.value['col'],elt.client,
              this.addVenteForm.value['caisse'].agence, dataOp);
              console.log(car);
            
            this.serTon.addACarnet(car).subscribe(
              dataCarnet=>{
                this.serTon.addATontine(new Tontine(dataOp.dateOp,datf,true,null,dataCarnet,this.addVenteForm.value['col'])).subscribe(
                  dataton=>{
                    this.serTon.addAnAffecter(new Affecter(dataton.dateDebut,true,
                      this.addVenteForm.value['col'],dataton)).subscribe(
                        dataAff=>{
                          this.carnets.splice(this.carnets.indexOf(elt));
                    if(this.carnets.length == 0){
                      this.tst.success("Vente enregistrée avec succès", 
                        'Vente de carnet');
                        let facture = new jsPDF();
                        facture.text(""+dataOp.caisse.agence.libAgence, 15,15);
                        facture.text('Collecteur: '+this.addVenteForm.value['col'].
                        personne.nomPers+' '+this.addVenteForm.value['col'].personne.prePers,
                        15,45);
                        facture.text("Reçu de reversement des colletes du "+this.addVenteForm.value['datCol'],20,25);
                        autoTable (facture, {
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
                            ['Total reversé', this.total]
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
                        });
                    /**/
                  }
                );
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
