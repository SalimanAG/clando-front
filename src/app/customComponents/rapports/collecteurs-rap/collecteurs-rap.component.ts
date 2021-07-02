import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogPdfViewData1, PdfViewerComponent } from 'app/customComponents/pdf-viewer/pdf-viewer.component';
import jsPDF from 'jspdf';
import { Agence } from 'models/agence.model';
import { Collecte } from 'models/collecte.model';
import { Collecteur } from 'models/collecteur.model';
import *as moment from 'moment';
import autotable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { AgenceService } from 'services/repertoire/agence.service';
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';

@Component({
  selector: 'app-collecteurs-rap',
  templateUrl: './collecteurs-rap.component.html',
  styleUrls: ['./collecteurs-rap.component.css']
})
export class CollecteursRapComponent implements OnInit, AfterViewInit {


  agences: Agence[]=[];
  collecteurs: Collecteur[]=[];
  colAgce: Collecteur[]=[];
  collectes: Collecte[]=[];
  isLoadingPage:boolean = true;
  panelOpenState = false;

  activites : FormGroup;

  constructor(private cdRef:ChangeDetectorRef, public asso : AssociationService,
    public serCol: AgentsCollecteurService, public agce: AgenceService, 
    public bulder : FormBuilder, public  tst : ToastrService, public dlg: MatDialog) { 
      this.getAllAgences();
      this.getAllCollecteurs();
      this.getAllCollectes();
      this.activites = bulder.group({
        agc : [''],
        col : [''],
        deb : [moment(new Date()).format('YYYY/MM/DDTHH:mm')],
        fin : [moment(Date.now()).format('YYYY/MM/DDTHH:mm')]
        //col : [this.colAgce[0].personne.nomPers+' '+this.colAgce[0].personne.prePers]
      });
    }

  getAllCollecteurs(){
    this.serCol.getAllCollecteurs().subscribe(
      data=>{
        this.collecteurs=data;
      },
      err=>{
        console.log('erreur collecteur',err);        
      }
    );
  }
  
  getAllCollectes(){
    this.serCol.getAllCollectes().subscribe(
      data=>{
        this.collectes=data;
      },
      err=>{
        console.log('erreur collecteur',err);        
      }
    );
  }
  
  getAllAgences(){
    this.agce.getAllAgences().subscribe(
      data=>{
        this.agences=data;
      },
      err=>{
        console.log('erreur collecteur',err);        
      }
    );
  }
  
  ngOnInit(): void {
    this.isLoadingPage = true;
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    this.isLoadingPage = false;
    this.cdRef.detectChanges();
  }

  imprimeActivites(){
    this.tst.info('Impression');
    let donnees=[];
    let col=this.collectes.filter(c=>c.collecteur.idCollecteur == 
      this.activites.value['col'].idCollecteur);
        let total=0;
      if(col.length>0){
        col.forEach(elt=> {
          
          let line=[];
          line.push(elt.dateCollecte);
          line.push(elt.tontine.carnet.idCarnet);
          line.push(elt.tontine.carnet.mise);
          line.push(elt.nbreMise);
          line.push(elt.nbreMise*elt.tontine.carnet.mise);
          donnees.push(line);
          total+= elt.nbreMise*elt.tontine.carnet.mise;
        });
      }
      if(donnees.length>0){
        let resultat: String;
    let pdfres =new jsPDF();
    pdfres.text('Activité d\'un collecteur', 15,15);
    autotable(pdfres, {
      theme: 'grid',
      head: [['Année', 'Mois', 'Echéance', 'Prix']],
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      margin: { top: 70 },
      body: donnees,
    });
    autotable(pdfres, {
      theme: 'grid',
      margin: { top: 0, left: 30, right: 5 },
      columnStyles: {
        0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', fontSize: 8 },
      },
      body: [
        ['Total reversé', total]
      ],
      bodyStyles: {
        fontSize: 8,
        cellPadding: 1,
      },
    });
    let donnes : DialogPdfViewData1;
    donnes={pdf: pdfres, nomFile:'mesResultats' }

        this.dlg.open(PdfViewerComponent,{ width: '80%', data:donnes});
      }
      else{
        this.tst.info('Aucune données à imprimer')
      }
    
  }

  filtre(){
    let ag = this.activites.value['agc'];
    this.asso.getAllAssocier().subscribe(
      data=>{
        let assoli=data.filter(a=>a.datFin == null && a.agence.codAgence == ag.codAgence);
        let co : Collecteur = this.collecteurs[0];
        this.colAgce=this.collecteurs.filter(c=> assoli.find(a=>a.pers.idPers == c.personne.idPers))
      }
    );
  }

}
