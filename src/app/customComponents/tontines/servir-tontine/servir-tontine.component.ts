import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogTontineData1 } from 'app/customComponents/tontines/tontines.component';
import { Ramassage } from 'models/ramassage.model';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TontineService } from 'services/repertoire/tontine.service';

@Component({
  selector: 'app-servir-tontine',
  templateUrl: './servir-tontine.component.html',
  styleUrls: ['./servir-tontine.component.css']
})
export class ServirTontineComponent implements OnInit {

  ramas : Ramassage;
  servirForm : FormGroup;
  ramassages : Ramassage[]=[];
  constructor(public bulder : FormBuilder, public serviceTontine : TontineService, 
    public dlgRef: MatDialogRef<ServirTontineComponent>, public toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public tontineData : DialogTontineData1) {
        this.servirForm = this.bulder.group({
          dat: [moment(new Date()).format('YYYY-MM-DDTHH:mm'), Validators.required],
          ton: ['', Validators.required],
          clt: ['', Validators.required],
          col: ['', Validators.required], 
          lot: ['', Validators.required], 
          lott: ['', Validators.required] 
        });
      this.getAllRamassages();
     }

  ngOnInit(): void {
    this.serviceTontine.getAllRamassage().subscribe(
      data=>{
        this.ramassages=data;
        this.ramas = this.ramassages.find(r=>r.tontine.numTont == this.tontineData.tontine.numTont);
        this.servirForm.patchValue({ton: this.ramas.tontine.numTont,
          clt: this.ramas.tontine.carnet.client.personne.nomPers+' '+
          this.ramas.tontine.carnet.client.personne.prePers+' '+this.ramas.tontine.carnet.client.personne.numTelPers,
          col: this.ramas.tontine.collecteur.personne.nomPers+' '+
          this.ramas.tontine.collecteur.personne.prePers, 
          lot: this.ramas.tontine.carnet.objet.composition,
          lott: this.ramas.tontine.carnet.objet.composition })
      },
    err=>{
      console.log(err);
    }
  );
  }

  getAllRamassages(){
    this.serviceTontine.getAllRamassage().subscribe(
      data=>{
        this.ramassages=data;
      },
      err=>{
        console.log(err);
      }
    );
  }
  save(){
    let t = this.tontineData.tontine;
    t.servir=new Date(this.servirForm.value['dat']);
    this.serviceTontine.editATontine(this.tontineData.tontine.numTont.toString(), t).subscribe(
      data=>{
            this.toastr.success('Tontine servie avec succès.','Service de tontine');
            this.dlgRef.close();
          },
          errr=>{
            console.log(errr);
            this.toastr.success('La tontine n\'a pas pu être servie.','Service de tontine');
          }
        );
  }
}
