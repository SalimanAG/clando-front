import { Component,inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';
import { Agence } from 'models/agence.model';
import { Associer } from 'models/associer.model';
import { Collecteur } from 'models/collecteur.model';
import { Personne } from 'models/personne.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { AgenceService } from 'services/repertoire/agence.service';
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';
import { DialogData1 } from '../agents-collecteurs.component';

@Component({
  selector: 'app-new-collecteur-dialog',
  templateUrl: './new-collecteur-dialog.component.html',
  styleUrls: ['./new-collecteur-dialog.component.css']
})
export class NewCollecteurDialogComponent implements OnInit {

  newForm : FormGroup;
  agences : Agence[];
  constructor(public dialogRef: MatDialogRef<NewCollecteurDialogComponent>, private tst: ToastrService,
    private bulder: FormBuilder, private users:UtilisateurService, public serCol : AgentsCollecteurService,
    public ags : AgenceService, public assos : AssociationService ) { 
      this.newForm = bulder.group({
        //login: ['', Validators.required],
        nom: ['', Validators.required],
        prenoms: ['', Validators.required],
        dateNaissance: [''],
        lieuNaissance: [''],
        situationMatri: [''],
        profession: [''],
        tel: ['', Validators.required],
        villeResidence: ['', Validators.required],
        sexe: ['M', Validators.required],
        autresInfos: [''],
        datC: [new Date(), Validators.required],
        agce: [true, Validators.required]
        //photo: [''],
      });

      this.chargerAgence();
      
    }
  ngOnInit(): void {
  }

  chargerAgence(){
    this.ags.getAllAgences().subscribe(
      (data)=>{
        this.agences=data;
        if(this.agences.length==0){
          this.tst.warning('Veuillez créer l\'agence à laquelle sera rattaché le collecteur','Collecteur');
          this.dialogRef.close();
        }
      },
      (err)=>{
        this.tst.error('Agences non chargées')
      }
    );
  }

  saveCollecteur(){
    let newPers:Personne = new Personne(this.newForm.value['nom'], this.newForm.value['prenoms'],
      this.newForm.value['sexe'], this.newForm.value['dateNaissance'],
      this.newForm.value['lieuNaissance'], this.newForm.value['situationMatri'], 
      this.newForm.value['profession'], this.newForm.value['villeResidence'], 
      this.newForm.value['tel'], this.newForm.value['autresInfos']); 
    //let newAg = this.ags.getAnAgenceById(this.newForm.value['agce']);
    let newAg=this.agences[this.agences.map(a=>a.codAgence).indexOf(this.newForm.value['agce'])];
     let newAsso=new Associer(this.newForm.value['datC'],null,false, false, newAg,newPers);
   
    if(newAg!=null){   
      this.users.addAPersonne(newPers).subscribe(
        (dataPers)=>{
          this.serCol.addACollecteur(new Collecteur(this.newForm.value['datC'],true,
          null,null,dataPers)).subscribe(
            (dataAgt)=>{
              newAsso.pers=dataPers;
              this.assos.addAAssocier(newAsso).subscribe(
                (dataAsso)=>{
                  this.tst.success('Succès de l\'enregistrement', 'Collecteur')
                  console.log(dataAsso);
                },
                (errAsso)=>{
                  this.tst.warning('Erreur  d\'enregistrement de l\'affectation del\'agent ', 'Collecteur');
                  console.log('Erreur pers', errAsso);
                }
              );
            },
            (errAgt)=>{
              this.tst.warning('Erreur  d\'enregistrement de l\'agent ', 'Collecteur');
              console.log('Erreur pers', errAgt);
            }
          );
        },
        (errPers)=>{
          this.tst.warning('Erreur  d\'enregistrement de l\'agent ', 'Collecteur');
          console.log('Erreur pers', errPers);
        }
      );
    }
  }
}
