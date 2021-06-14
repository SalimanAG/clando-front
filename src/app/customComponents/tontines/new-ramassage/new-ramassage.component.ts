import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';
import { Ramassage } from 'models/ramassage.model';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TontineService } from 'services/repertoire/tontine.service';
import  { DialogTontineData1 } from '../tontines.component'

@Component({
  selector: 'app-new-ramassage',
  templateUrl: './new-ramassage.component.html',
  styleUrls: ['./new-ramassage.component.css']
})
export class NewRamassageComponent implements OnInit {

  newForm : FormGroup;

  constructor(public dlRef: MatDialogRef<NewRamassageComponent>, 
    private tst: ToastrService,
    private bulder: FormBuilder, private tont: TontineService, 
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogTontineData1) {
    
    this.newForm = bulder.group({
      dat: [moment(new Date()).format('YYYY-MM-DDTHH:mm'), Validators.required],
      ton: [dialogData.tontine.numTont, Validators.required],
      clt: [dialogData.tontine.clt.personne.nomPers+' '+
      dialogData.tontine.clt.personne.prePers+' '+dialogData.tontine.clt.personne.numTelPers, Validators.required],
      col: [dialogData.tontine.collecteur.personne.nomPers+' '+
      dialogData.tontine.collecteur.personne.prePers, Validators.required], 
      typ: ['Normal', Validators.required],
      nat: [dialogData.tontine.objet.natLot, Validators.required], 
      lot: [dialogData.tontine.objet.composition, Validators.required], 
      lott: [dialogData.tontine.objet.composition, Validators.required], 
      pen: [0], com: [0], 
      obj: [dialogData.tontine.objet.composition, Validators.required]
    });
        
   }

  ngOnInit(): void {
    
  }

  aServir(){
    console.log(this.newForm.value['typ']);
    
    let lo = this.newForm.value['ton'].objet.composition;
    if(this.newForm.value['typ'] == 'Normal'){
      console.log('Rammassage normal');
      
      if(this.newForm.value['ton'] != null){
        this.newForm.patchValue({
          'lot' : this.newForm.value['ton'].objet.composition,
        nat:this.newForm.value['ton'].objet.natLot})
      }
      else{
        this.newForm.patchValue({nat:''})
      }
    }
  }

  save(){
    let newRamas=new Ramassage(this.newForm.value['dat'],this.newForm.value['typ'],
    this.newForm.value['nat'],this.newForm.value['pen'],this.newForm.value['com'],
    this.newForm.value['lot'],false,this.dialogData.tontine,null);
    let t = this.dialogData.tontine;
    t.encours=false;
    this.tont.editATontine(this.dialogData.tontine.numTont.toString(), t).subscribe(
      data=>{
        this.tont.addARamassage(newRamas).subscribe(
          data=>{
            this.tst.success('ramassage initié avec succès. Veuillez en attendre '+
            'la validation','Ramassage');
          },
          errr=>{
            console.log(errr);
            
          }
        );
      },
      err=>{
        this.tst.warning('Ajout échoué.','Ramassage');
        console.log((err));        
      }
    );
    this.dlRef.close();
  }

  close(){
    this.dlRef.close();
  }
}
