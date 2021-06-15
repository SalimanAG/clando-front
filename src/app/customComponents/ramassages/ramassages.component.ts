import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ramassage } from 'models/ramassage.model';
import { ToastrService } from 'ngx-toastr';
import { TontineService } from 'services/repertoire/tontine.service';
import { DetailRamassageComponent } from './detail-ramassage/detail-ramassage.component';
import { EditRamassageComponent } from './edit-ramassage/edit-ramassage.component';

export interface ramasData{
  ramassage : Ramassage
}
@Component({
  selector: 'app-ramassages',
  templateUrl: './ramassages.component.html',
  styleUrls: ['./ramassages.component.css']
})
export class RamassagesComponent implements OnInit, AfterViewInit {

  ramassages : Ramassage[]=[];
  dataSource : MatTableDataSource<Ramassage>
  isLoadingPage=true;
  isLoadingResults=false;
  ramas =new Ramassage(null,'','',0,0,'',false,null,null);
  
  displayedColumns: string[] = ['dat', 'clt', 'lot', 'action'];
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(public tst : ToastrService,  public tns : TontineService,
     public detector : ChangeDetectorRef, public dlg : MatDialog) { 
       this.getAllRamassages();
     }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.isLoadingPage=false;
    this.detector.detectChanges();
  }

  getAllRamassages(){
    this.tns.getAllRamassage().subscribe(
      data=>{
        this.ramassages= data;
        this.dataSource = new MatTableDataSource(this.ramassages);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        this.isLoadingResults=false;
      },
      err=>{
        this.tst.warning('Erreur de chargement des ramassages','Ramassage')
        console.log('Erreu de chargement: ', err);  
      }
    );
  }
  
  onEdit(ramas: Ramassage){
    let dat: ramasData = {ramassage: ramas, };
    let dialog = this.dlg.open(EditRamassageComponent, {
      data: dat, 
    });
    console.log(dat);
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.getAllRamassages();

    });
  }

  onDelete(ram: Ramassage){
    this.ramas = ram;    
  }
  
  onConfirmDelete(): void {
    if(this.ramas.valider == true){
      let tont = this.ramas.tontine.numTont;
      this.tns.deleteARamassage(this.ramas.numRama).subscribe(
        (data) => {
          this.tns.deleteATontine(tont.valueOf()).subscribe(
            data=>{
              this.tst.success('Suppression effectuée avec Succès', 'Ramassage');
              this.getAllRamassages();
            },
            errTont=>{ console.log(errTont);}
          );
         },
        (erreur) => {
          console.log('Erreur lors de la Suppression du ramassage.', erreur);
          this.tst.error('Erreur lors de la Suppression du ramassage.\n Code : '+erreur.status+' | '+erreur.statusText, 'Tontines');
        }
      );
    }
    else{
      this.tns.deleteARamassage(this.ramas.numRama).subscribe(
        (data)=>{
          this.tst.success('Suppression effectuée avec succes','Ramassage')
          this.getAllRamassages();
        },
        (erreur) => {
          console.log('Erreur lors de la Suppression du ramassage.', erreur);
          this.tst.error('Erreur lors de la Suppression du ramassage.\n Code : '+erreur.status+' | '+erreur.statusText, 'Tontines');
        }
      );
    }
    
  }

  onInfosClicked(ram: Ramassage){
    //console.log(user);
    let dat: ramasData = {ramassage: ram, };
    
    let dialog = this.dlg.open(DetailRamassageComponent, {
      data: dat, 

    });
  }

  valider(r : Ramassage){

  }
}
