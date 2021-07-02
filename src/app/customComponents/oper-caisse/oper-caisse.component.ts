import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Agence } from 'models/agence.model';
import { Caisse } from 'models/caisse.model';
import { ToastrService } from 'ngx-toastr';
import { CaissiereService } from 'services/repertoire/caissiere.service';
import { AgenceService } from 'services/repertoire/agence.service';
//import { EditCaisseDialogComponent } from './edit-caisse-dialog/edit-caisse-dialog.component';
import { NewOperCaisseDialogComponent} from './new-oper-caisse-dialog/new-oper-caisse-dialog.component';
import { OpCaisse } from 'models/opcaisse.model';
import { TontineService } from 'services/repertoire/tontine.service';
import { OperCaisseService } from 'services/enregistrement/oper-caisse.service';
import { Collecte } from 'models/collecte.model';
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';
import { Ramassage } from 'models/ramassage.model';
import { Depense } from 'models/depense.model';
import { DepensesService } from 'services/enregistrement/depenses.service';
import { NewVenteComponent } from './new-vente/new-vente.component';
import { NewDepenseComponent } from './new-depense/new-depense.component';

export interface opcDialogData{
  opcaisse : OpCaisse;
}
@Component({
  selector: 'app-oper-caisse',
  templateUrl: './oper-caisse.component.html',
  styleUrls: ['./oper-caisse.component.css']
})
export class OperCaisseComponent implements OnInit, AfterViewInit {

  opcaisse= new OpCaisse(null,null,null,null,null,null,null);
  opc: OpCaisse[] = [];
  collectes : Collecte[] = [];
  ramassages : Ramassage[] = [];
  depenses : Depense[] = [];
  @ViewChild(MatSort) maSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['num', 'cai', 'dat', 'typ', 'action'];
  list: MatTableDataSource<OpCaisse>;
  isLoadingPage: boolean=true;
  islodingResult: boolean=false;
  
  constructor(public dialog:MatDialog, private serviceCaisse: CaissiereService, 
    private serCol: AgentsCollecteurService, private toastr: ToastrService, 
    public serop: OperCaisseService, public detector: ChangeDetectorRef, 
    public dps : DepensesService) { 
      this.getAllOp();
      this.getAllCollectes();
    }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.isLoadingPage=false;
    this.detector.detectChanges();
  }

  onNewcaisseBottonClicked(){
    let dialog = this.dialog.open(NewOperCaisseDialogComponent);
    dialog.afterClosed().subscribe(result => {
      this.getAllOp();
      console.log(result);
    });
  }

  newVente(){
    let dialog = this.dialog.open(NewVenteComponent);
    dialog.afterClosed().subscribe(result => {
      this.getAllOp();
      console.log(result);
    });
  }

  newDepense(){
    let dialog = this.dialog.open(NewDepenseComponent);
    dialog.afterClosed().subscribe(result => {
      this.getAllOp();
      console.log(result);
    });
  }

  getAllOp(){
    this.serop.getAllOpCaisse().subscribe(
      data=>{
        this.opc=data;
        this.list=new MatTableDataSource(this.opc);
        this.list.paginator=this.paginator;
        this.list.sort=this.maSort;
        this.islodingResult=true;
      },
      err=>{
        console.log((err));
        
      }
    );
  }

  getAllCollectes(){
    this.serCol.getAllCollectes().subscribe(
      data=>{
        this.collectes=data;
      },
      err=>{
        console.log((err));
      }
    );
  }

  getAllDepenses(){
    this.dps.getAllDepense().subscribe(
      data=>{
        this.depenses=data;
      },
      err=>{
        console.log((err));
      }
    );
  }

  getAllramassages(){
    this.serCol.getAllCollectes().subscribe(
      data=>{
        this.collectes=data;
      },
      err=>{
        console.log((err));
      }
    );
  }

  deleteClicked(op : OpCaisse){
    this.opcaisse=op;
  }

  delete(){
    let ligne:any;
    if(this.opcaisse.typeOp.codTyp == '2'){
      ligne= this.collectes.filter(c=>c.opcaisse.numOpCaisse == this.opcaisse.numOpCaisse);
      let n= ligne.length;
      if(n>0){
        ligne.forEach(element => {
          this.serCol.deleteACollecte(element.idCollecte.toString()).subscribe(
            data=>{
              console.log('Euppression réussi de '+element.tontine.carnet.idCarnet);
              
              n=n-1;
              if(n=0){
                this.serop.deleteAnOpCaisse(this.opcaisse.numOpCaisse).subscribe(
                  data=>{
                    this.toastr.success('Suppression éffectuée avec succès','Opération de caisse');
                    this.getAllOp();
                    this.getAllCollectes();
                  },
                  erreur=>{
                    this.toastr.warning('La suppression a échoue','Opération de caisse');
                    console.log('erreur de suppression \n', erreur);
                  }
                );
              }
            }
          );
          
        },
        errcols=>{
          console.log('Erreur collecte',errcols);
        });  
      }
      else{
        
      }
    }
    else{
//      if(this.opcaisse.typeOp.codTyp=='3'){
//        ligne = 
//       }
    }
  }

  abandonnesup(){
    this.toastr.info("Suppression abandoner","Opération de caisse")
  }

  annulClicked(op : OpCaisse){
    this.opcaisse=op;
  }

  annule(){
    this.opcaisse.valide=false;
    this.serop.editAnllOpCaisse(this.opcaisse.numOpCaisse, this.opcaisse).
    subscribe(
      data=>{
        this.toastr.success('Annulation effectuée avec succès','Opération de caisse');
      },
      err=>{
        this.toastr.error('Annulation échouée','Opération de caisse');
        console.log('Annulation échouée',err);
      }
    );
  }

  abandonneAnnul(){
    this.toastr.info("Annulation abandoner","Opération de caisse")
  }

  validerClicked(op : OpCaisse){
    this.opcaisse=op;
  }

  Valider(){
    this.opcaisse.valide=true;
    this.serop.editAnllOpCaisse(this.opcaisse.numOpCaisse, this.opcaisse).
    subscribe(
      data=>{
        this.toastr.success('Validaion effectuée avec succès','Opération de caisse');
      },
      err=>{
        this.toastr.error('Validation échouée','Opération de caisse');
        console.log('Validation échouée',err);
      }
    );
  }

  abandonneValider(){
    this.toastr.info("Validation abandoner","Opération de caisse")
  }

}
