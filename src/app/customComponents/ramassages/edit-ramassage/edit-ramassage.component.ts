import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ramasData, RamassagesComponent} from '../ramassages.component';
import * as moment from 'moment';
import { RamassageService } from 'services/enregistrement/ramassage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Ramassage } from 'models/ramassage.model';
import { TontineService } from 'services/repertoire/tontine.service';
import { Tontine } from 'models/tontine.model';
import { Carnet } from 'models/carnet.model';
import { Affecter } from 'models/affecter.model';

@Component({
  selector: 'app-edit-ramassage',
  templateUrl: './edit-ramassage.component.html',
  styleUrls: ['./edit-ramassage.component.css']
})
export class EditRamassageComponent implements OnInit {

  affectations : Affecter[]=[];
  CollTon : Affecter[]=[];
  tontines : Tontine[]=[];
  carnets : Carnet[]=[];
  tontinevalable : Tontine[]=[];
  rama : Ramassage[]=[];
  editForm : FormGroup
  constructor(public dialogRef: MatDialogRef<EditRamassageComponent>, private tst: ToastrService,
    private bulder: FormBuilder,  private tns:TontineService, 
    @Inject(MAT_DIALOG_DATA) public dialogData:ramasData) { 
    
      this.editForm = bulder.group({
        dat: [moment(new Date()).format("YYYY-MM-DDThh:mm"), Validators.required],
        ton: [dialogData.ramassage.tontine.numTont, Validators.required],
        //carnet: [dialogData.ramassage.tontine.numTont, Validators.required],
        clt: [dialogData.ramassage.tontine.carnet.client.personne.nomPers+' '+
        dialogData.ramassage.tontine.carnet.client.personne.prePers+' '+dialogData.ramassage.tontine.carnet.client.personne.numTelPers, Validators.required],
        col: [dialogData.ramassage.tontine.collecteur.personne.nomPers+' '+
        dialogData.ramassage.tontine.collecteur.personne.prePers, Validators.required], 
        typ: [dialogData.ramassage.typeRam, Validators.required],
        nat: [dialogData.ramassage.tontine.carnet.objet.natLot, Validators.required], 
        lot: [dialogData.ramassage.tontine.carnet.objet.composition, Validators.required], 
        lott: [dialogData.ramassage.tontine.carnet.objet.composition, Validators.required], 
        pen: [dialogData.ramassage.penalite], com: [dialogData.ramassage.complement], 
        obj: [dialogData.ramassage.tontine.carnet.objet.composition, Validators.required],
        collecteur: ['', Validators.required]});
      console.log(dialogData.ramassage);
      
    this.chargerTontine();
    this.chargerCarnet();
    this.chargerAffectations();
   }

   chargerTontine(){
     this.tns.getAllTontines().subscribe(
       data=>{
         this.tontines=data;
         this.tontinevalable=this.tontines.filter(t=>t.encours == true);
         this.tns.getAllRamassage().subscribe(
           datar=>{
             this.rama = datar;
           }
         );
       }
     );
   }

   chargerCarnet(){
     this.tns.getAllCarnet().subscribe(
       data=>{
         this.carnets=data;
       });
   }

   chargerAffectations(){
     this.tns.getAllAffecter().subscribe(
       data=>{
         this.affectations=data;
       });
    }

  ngOnInit(): void {
  }

  save(){
    let newRam=new Ramassage(this.editForm.value['dat'],this.editForm.value['typ'],this.editForm.value['nat'],
      this.editForm.value['pen'], this.editForm.value['com'], this.editForm.value['lot'],
      this.dialogData.ramassage.valider,this.dialogData.ramassage.tontine,null);
    if(this.dialogData.ramassage.tontine.servir != null){
      if(this.dialogData.ramassage.penalite != this.editForm.value['pen'] || 
        this.dialogData.ramassage.complement != this.editForm.value['com'] || 
        this.dialogData.ramassage.natLot != this.editForm.value['nat'] || 
        this.dialogData.ramassage.tontine.numTont != this.editForm.value['ton'] || 
        this.dialogData.ramassage.lotservi != this.editForm.value['lot']){
          this.tst.info('pour une tontine déjà servie, seule la date de ramassage est modifiable', 'Ramassage');
          this.dialogRef.close();
        }
        else{
          this.tns.editARamassage(newRam.numRama,newRam).subscribe(
            dataRam=>{
              this.tst.success('Modification effectuée avec succès','Ramassage');
              this.dialogRef.close();
            },
            erRam=>{
              console.log(erRam);
              this.tst.warning('Echec de la modification', 'Ramassage');
              this.dialogRef.close();
            }
          );
        }
    }
    else{
        this.tns.editARamassage(this.dialogData.ramassage.numRama, newRam).subscribe(
          data=>{
            if(this.dialogData.ramassage.tontine.numTont != this.editForm.value['ton']){
              let anton = this.dialogData.ramassage.tontine;
              anton.encours=true;
              this.tns.editATontine(anton.numTont.toString(),anton).subscribe(
                dataat=>{
                  let at = newRam.tontine;
                  at.encours=false;
                  this.tns.editATontine(at.numTont.toString(), at).subscribe(
                    datam=>{
                    this.tst.success('Modification effectuée avec succès','Ramassage');
                    this.dialogRef.close();
                    },                    
                    errm=>{
                      this.tst.warning('Echec de la modification','Ramassage');
                      console.log(errm);
                      this.dialogRef.close();
                    });
                },
                errat=>{console.log(errat);
                }                  
              );
            }
            else{
              this.tst.success('Modification effectuée avec succès','Ramassage');
              this.dialogRef.close();
            }
          },
          erreur=>{
            console.log(erreur);
            this.tst.warning('Echec de la modification','Ramassage');
            this.dialogRef.close();
          }
      );
    }
  }
}

