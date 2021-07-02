import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogPdfViewData1, PdfViewerComponent } from 'app/customComponents/pdf-viewer/pdf-viewer.component';
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable';
import { Agence } from 'models/agence.model';
import { Collecte } from 'models/collecte.model';
import *as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { AgenceService } from 'services/repertoire/agence.service';
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';

@Component({
  selector: 'app-collectes',
  templateUrl: './collectes.component.html',
  styleUrls: ['./collectes.component.css']
})
export class CollectesComponent implements OnInit, AfterViewInit {


  isLoadingPage:boolean = true;
  panelOpenState = false;


  agences: Agence[]=[];
  collectes: Collecte[]=[];
  collectesV : Collecte[]=[];

  colForm : FormGroup;

  constructor(private cdRef:ChangeDetectorRef, public asso : AssociationService,
    public serCol: AgentsCollecteurService, public agce: AgenceService, 
    public bulder : FormBuilder, public  tst : ToastrService, public dlg: MatDialog) { 
      
      this.getAllAgences();
      this.getAllCollectes();
      this.colForm = bulder.group({
        agc : [''],
        deb : [moment(new Date()).format('YYYY-MM-DDTHH:mm')],
        fin : [moment(Date.now()).format('YYYY-MM-DDTHH:mm')]
        //col : [this.colAgce[0].personne.nomPers+' '+this.colAgce[0].personne.prePers]
      });
    }


  ngOnInit(): void {
    this.isLoadingPage = true;
    this.cdRef.detectChanges();
    console.log('init', this.isLoadingPage);
  }
  
  getAllAgences(){
    this.agce.getAllAgences().subscribe(
      data=>{
        this.agences=data;
        console.log(this.agences);
        
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
        console.log(this.collectes);
        
      },
      err=>{
        console.log('erreur collecteur',err);        
      }
    );
  }
  
  ngAfterViewInit() {
    this.isLoadingPage = false;
    this.cdRef.detectChanges();
    console.log('init2', this.isLoadingPage);
  }

  imprimeCollectes(){
    console.log(this.colForm.value['agc']);
    
    let col=[];
    let line=[];
    let totalCollecte=0;
    if(this.colForm.value['agc']==null){
      this.agences.forEach(element => {
        this.collectesV=this.collectes.filter(c=>c.tontine.carnet.agence.codAgence 
          == element.codAgence && new Date(c.dateCollecte) >= 
          new Date(this.colForm.value['deb'])
          && new Date(c.dateCollecte) <= new Date(this.colForm.value['fin']));
        if(this.collectesV.length>0){
          let nb=this.collectesV.reduce((nb,c)=>nb+=c.nbreMise,0);
          let s=this.collectesV.reduce((s,c)=>s+=c.nbreMise*c.tontine.carnet.mise,0);
          col.push(element.libAgence);
          col.push(nb);
          col.push(s);
          line.push(col);
          totalCollecte+=s
        }
      });
    }
    else{
      this.collectesV=this.collectes.filter(c=>c.tontine.carnet.agence.codAgence 
        == this.colForm.value['agc'].codAgence && new Date(c.dateCollecte) >= 
        new Date(this.colForm.value['deb'])
        && new Date(c.dateCollecte) <= new Date(this.colForm.value['fin']));
      if(this.collectesV.length>0){
        let nb=this.collectesV.reduce((nb,c)=>nb+=c.nbreMise,0);
        let s=this.collectesV.reduce((s,c)=>s+=c.nbreMise*c.tontine.carnet.mise,0);
        col.push(this.colForm.value['agc'].libAgence);
        col.push(nb);
        col.push(s);
        line.push(col);
        totalCollecte+=s
      }
    }
    if(totalCollecte ==0){
      this.tst.info('Aucune donnée à imprimer','Bilan de collecte');
    }
    else{
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
      body: line,
    });
    autotable(pdfres, {
      theme: 'grid',
      margin: { top: 0, left: 30, right: 5 },
      columnStyles: {
        0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', fontSize: 8 },
      },
      body: [
        ['Total centralisé', totalCollecte]
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
  }
  

}
