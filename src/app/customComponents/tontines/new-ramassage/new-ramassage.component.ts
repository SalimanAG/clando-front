import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';
import { Depense } from 'models/depense.model';
import { MotifDepense } from 'models/motifDepense.model';
import { Ramassage } from 'models/ramassage.model';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DepensesService } from 'services/enregistrement/depenses.service';
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
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogTontineData1, 
    public dps : DepensesService) {
    
    this.newForm = bulder.group({
      dat: [moment(new Date()).format('YYYY-MM-DDTHH:mm'), Validators.required],
      ton: [dialogData.tontine.numTont, Validators.required],
      //: [dialogData.tontine.numTont, Validators.required],
      car: [dialogData.tontine.carnet.idCarnet, Validators.required],
      clt: [dialogData.tontine.carnet.client.personne.nomPers+' '+
        dialogData.tontine.carnet.client.personne.nomPers+' '+
        dialogData.tontine.carnet.client.personne.nomPers, Validators.required],
      col: [dialogData.tontine.carnet.collecteur.personne.nomPers+' '+
      dialogData.tontine.collecteur.personne.prePers, Validators.required], 
      typ: ['Normal', Validators.required],
      nat: [dialogData.tontine.carnet.objet.natLot, Validators.required], 
      lot: [dialogData.tontine.carnet.objet.composition, Validators.required], 
      lott: [dialogData.tontine.carnet.objet.composition, Validators.required], 
      pen: [0], com: [0], 
      obj: [dialogData.tontine.carnet.objet.composition, Validators.required]
    });
        console.log('tontine'+dialogData.tontine.numTont);
        
   }

  ngOnInit(): void {
    
  }

  aServir(){
    //let lo = this.newForm.value['ton'].car.objet.composition;
    if(this.newForm.value['typ'] == 'Normal'){
      console.log(this.newForm.value['ton']);
      
      if(this.newForm.value['ton'] != null){
        this.newForm.patchValue({
          'lot' : this.dialogData.tontine.carnet.objet.composition,
        nat:this.dialogData.tontine.carnet.objet.natLot})
      }
      else{
        this.newForm.patchValue({nat:'', lot: ''});
      }
    }
    else{
      this.newForm.patchValue({lot : '', nat: ''});
    }
  }

  save(){
    let newRamas=new Ramassage(this.newForm.value['dat'],this.newForm.value['typ'],
    this.newForm.value['nat'],this.newForm.value['pen'],this.newForm.value['com'],
    this.newForm.value['lot'],false,this.dialogData.tontine,null);
    let t = this.dialogData.tontine;
    t.encours=false; 
    this.tont.addARamassage(newRamas).subscribe(
      dataRama=>{
        this.tont.editATontine(this.newForm.value['ton'], t).subscribe(
          dataEditTontine=>{
            if(this.newForm.value['Nat'] == 'Espèce'){
              let depense=new Depense(0,this.newForm.value['dat'],
              this.dialogData.tontine.carnet.client.personne.nomPers+
              ' '+this.dialogData.tontine.carnet.client.personne.prePers,'Ramassage de tontine N°'+
              this.dialogData.tontine.numTont+' carnet '+this.dialogData.tontine.carnet.idCarnet,
              this.newForm.value['lot'], false,null,new MotifDepense('1','Ramassage'),this.dialogData.tontine.carnet.agence);
              this.dps.saveADepense(depense).subscribe(
                dataDep=>{
                  this.tst.success('Ramassage initié avec succès. Veuillez en attendre '+
                    'la validation','Ramassage');
                  },
                erreurDepense=>{
                  t.encours=true;
                  this.tont.editATontine(t.numTont.toString(), t).subscribe(
                    datarestoreTontine=>{
                      this.tont.deleteARamassage(dataRama.numRama.toString()).subscribe(
                        dataSupRam=>{
                          this.tst.success('Initiation de ramassage échouée. ','Ramassage');
                        },
                        erreurSupRam=>{
                          this.tst.success('Initiation de ramassage échouée. ','Ramassage');
                          console.log(erreurSupRam);
                        }
                      );
                    },
                    erreurrestoreTontine=>{
                      this.tst.success('Initiation de ramassage échouée. ','Ramassage');
                      console.log('erreurSupRamassage', erreurrestoreTontine);
                    }
                  );
                });
            }
            else{
              this.tst.success('Ramassage initié avec succès. Veuillez en attendre '+
              'la validation','Ramassage');
            }
          },
          erreurEditingTontine=>{
            console.log(erreurEditingTontine);
            this.tont.deleteARamassage(dataRama.numRama.toString()).subscribe(
              dataDelRama=>{
                this.tst.success('Initiation de ramassage échouée. ','Ramassage');
              },
              erreorDelRama=>{
                this.tst.success('Initiation de ramassage échouée. ','Ramassage');
                console.log(erreorDelRama);
              }
            );
            
          });
        },
        errorRama=>{
          this.tst.success('Initiation de ramassage échouée. ','Ramassage');
          console.log(errorRama);
        });
    this.dlRef.close();
  }

  close(){
    this.dlRef.close();
  }
}
