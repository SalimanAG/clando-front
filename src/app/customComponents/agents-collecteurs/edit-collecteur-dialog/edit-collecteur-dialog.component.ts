import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agence } from 'models/agence.model';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { AgenceService } from 'services/repertoire/agence.service';
import { DialogData1 } from '../agents-collecteurs.component'
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';
import { Personne } from 'models/personne.model';
import { Collecteur } from 'models/collecteur.model';
import { Associer } from 'models/associer.model';
import { AssociationService } from 'services/administration/association.service';


@Component({
  selector: 'app-edit-collecteur-dialog',
  templateUrl: './edit-collecteur-dialog.component.html',
  styleUrls: ['./edit-collecteur-dialog.component.css']
})
export class EditCollecteurDialogComponent implements OnInit {

  editForm : FormGroup;
  collecteurs : Collecteur[];
  collect : Collecteur;
  agences : Agence[];
  constructor(public dialogRef: MatDialogRef<EditCollecteurDialogComponent>, private tst: ToastrService,
    public bulder: FormBuilder, private users:UtilisateurService, public assos : AssociationService,
    public serCol : AgentsCollecteurService,
    public ags : AgenceService,  @Inject(MAT_DIALOG_DATA) public dldt : DialogData1 ) { 
    
    this.chargerAgence();
    this.chargerCollecteur();
    this.editForm = this.bulder.group({
      nom: [this.dldt.association.pers.nomPers, Validators.required],
      prenoms: [this.dldt.association.pers.prePers, Validators.required],
      dateNaissance: [this.dldt.association.pers.datNaiPers],
      lieuNaissance: [this.dldt.association.pers.lieuNaiPers],
      situationMatri: [this.dldt.association.pers.sitMatPers],
      profession: [this.dldt.association.pers.profPers],
      tel: [this.dldt.association.pers.numTelPers, Validators.required],
      villeResidence: [this.dldt.association.pers.vilPers, Validators.required],
      sexe: [this.dldt.association.pers.sexPers, Validators.required],
      autresInfos: [this.dldt.association.pers.autreinfos],
      datC: ['', Validators.required],
      datAr: [''],
      motif: [''],
      datArri: [this.dldt.association.datDeb, Validators.required],
      datDep: [this.dldt.association.datFin],
      agce: [this.dldt.association.agence.codAgence, Validators.required]
      //photo: [''],
    });
    
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

  chargerCollecteur(){
    this.serCol.getAllCollecteurs().subscribe(
      (data)=>{
        this.collecteurs=data;
        this.collect = this.collecteurs.find(c=>c.personne.idPers== this.dldt.association.pers.idPers)
        this.editForm.patchValue({datC: this.collect.dateArrive, datAr:this.collect.dateArret, motif:this.collect.motifArret});
        
      },
      (err)=>{
        this.tst.error('Agences non chargées')
      }
    );
  }

  edit(){
    let newPers:Personne = new Personne(this.editForm.value['nom'], this.editForm.value['prenoms'],
    this.editForm.value['sexe'], this.editForm.value['dateNaissance'],
    this.editForm.value['lieuNaissance'], this.editForm.value['situationMatri'], 
    this.editForm.value['profession'], this.editForm.value['villeResidence'], 
    this.editForm.value['tel'], this.editForm.value['autresInfos']);
    
    this.users.editAPersonne(this.dldt.association.pers.idPers.toString(), newPers).subscribe(
      (dataP) => {
        let col = this.collecteurs.find(c=>c.personne.idPers == dataP.idPers);
        let newCol:Collecteur = new Collecteur(this.editForm.value['datC'], col.collecteurActif,
        this.editForm.value['datAr'],this.editForm.value['motif'], dataP)
        this.serCol.editACollecteur(col.idCollecteur.toString(), newCol).subscribe(
          (data2) => {
            let newAsso= new Associer(this.editForm.value['datArri'],this.editForm.value['datDep'],
            this.agences.find(a=> a.codAgence = this.editForm.value['agce']), dataP, false,false);
            this.assos.editAAssocier(this.dldt.association.idAssocier.toString(),newAsso).subscribe(
              (dataA)=>{
                this.dialogRef.close(true);
                this.tst.success('Modification effectuée avec Succès', 'Modifier Utilisateur');
              },
          (erreurA) => {
            console.log('Erreur ', erreurA);
            console.log('Erreur Statu ', erreurA.status);
            this.tst.error('Modification échouée '+erreurA.status+' | '+erreurA.statusText, 'Utilisateurs');
          }
            );
          },
          (erreurC) => {
            console.log('Erreur lors de l\'Ajout de collecteur.', erreurC);
            this.tst.error('Erreur lors de l\'Ajout de l\'Utilisateur.\n Code : '+erreurC.status+' | '+erreurC.statusText, 'Utilisateurs');
          }
        );

      },
      (erreurP) => {
        console.log('Erreur lors de l\'Ajout de Personne.', erreurP);
        this.tst.error('Erreur lors de l\'Ajout du collecteur.\n Code : '+erreurP.status+' | '+erreurP.statusText, 'Collecteur');
      }
    );
    
  }

}
