import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Associer } from 'models/associer.model';
import { Confirmer } from 'models/confirmer.model';
import { MotifDepense } from 'models/motifDepense.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { TypesDepenseService } from 'services/administration/types-depense.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { AgenceService } from 'services/repertoire/agence.service';
import { DialogUserAgenceData1 } from '../user-to-agence.component';

@Component({
  selector: 'app-edit-asso-user-to-agence-dialog',
  templateUrl: './edit-asso-user-to-agence-dialog.component.html',
  styleUrls: ['./edit-asso-user-to-agence-dialog.component.css']
})
export class EditAssoUserToAgenceDialogComponent implements OnInit, AfterViewInit {

  editAAssoUserToAgenceForm:FormGroup;
  typesDepense: MotifDepense[] = [];
  selectedTypesDepense: MotifDepense[] = [];
  concernededTypesDepense: MotifDepense[] = [];
  confirmers: Confirmer[] = [];
  selectedTypesDepenseString: String[] = [];
  typesDepenseString: String[] = [];
  typeDepControle: FormControl = null;

  constructor(public dialogRef: MatDialogRef<EditAssoUserToAgenceDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder,  private serviceUser:UtilisateurService, private serviceTypeDepense: TypesDepenseService, 
    private serviceUserAgence: AssociationService, private serviceAgence: AgenceService, 
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogUserAgenceData1) { 
      this.editAAssoUserToAgenceForm = bulder.group({
        user: ['', Validators.required],
        agence: ['', Validators.required],
        dateDebut: ['', Validators.required],
        dateFin: [''],
        motifDepenses: [''],
        valRamassage: [false],
        
      })
      
    this.getAllTypesDepense();

  }

  ngOnInit(): void {
    //this.getAllConfirmer();

  }

  ngAfterViewInit(): void {
    
              

  }

  getAllTypesDepense(){
    this.serviceTypeDepense.getAllMotifDepenses().subscribe(
      (data) => {
        this.typesDepense = data;
        this.typesDepense.forEach(element => {
          this.typesDepenseString.push(element.codeMoD);
        });
        
        this.getAllConfirmer();
      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Types de dépense', erreur);
        //this.isLoadingResults = false;
        this.toastr.error('Erreur lors de la récupération de liste des Types de Dépense.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
      }
    );
  }

  getAllConfirmer(){
    this.serviceUserAgence.getAllConfirmer().subscribe(
      (data) => {
        this.confirmers = data;
        console.log('dataConfirm', data);
        let tab: String[] = [];
        let tab2: MotifDepense[] = [];
        data.forEach(element => {
          if(element.associer.idAssocier == this.dialogData.associer.idAssocier){
            this.concernededTypesDepense.push(element.motifDepense);
            //tab2.push(element.motifDepense);
            
            tab.push(element.motifDepense.codeMoD);
            
            console.log('Val Iit Select', this.selectedTypesDepenseString);
            this.typesDepense.forEach(element2 => {
              if(element.motifDepense.codeMoD == element2.codeMoD){
                tab2.push(element2);
              }
            });
          } 
          


        });

        this.selectedTypesDepenseString = tab;
        this.selectedTypesDepense = tab2;

        

        //this.typeDepControle = new FormControl(this.selectedTypesDepenseString);
        console.log('connfirms', this.confirmers, 'concerned', this.concernededTypesDepense, 'selected', this.selectedTypesDepense);

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Confirmers', erreur);
        //this.isLoadingResults = false;
        this.toastr.error('Erreur lors de la récupération de liste des Associations Validation.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
      }
    );
  }

  onValiderAssoUserToAgenceEditClicked(){

    let isAlwaysValidator = true;

    if(this.selectedTypesDepense.length == 0){
      isAlwaysValidator = false;
    }

    let newAssoUserAgence: Associer = new Associer(this.editAAssoUserToAgenceForm.value['dateDebut'], this.editAAssoUserToAgenceForm.value['dateFin'],
    this.dialogData.associer.agence, this.dialogData.associer.pers, isAlwaysValidator, this.editAAssoUserToAgenceForm.value['valRamassage']);
    //console.log('obj', newAssoUserAgence);
    this.serviceUserAgence.editAAssocier(this.dialogData.associer.idAssocier.toString() ,newAssoUserAgence).subscribe(
      (data) => {
        
        for(const nneww of this.selectedTypesDepense){

          let newer: boolean = true;

          for(const old of this.concernededTypesDepense){
            if(nneww.codeMoD == old.codeMoD){
              newer = false;
              break;
            }
          }

          if(newer){
            this.serviceUserAgence.addAConfirmer(new Confirmer(true, data, nneww)).subscribe(
              (data2) => {

              },
              (erreur) => {
                console.log('Erreur lors de l\'Ajout de l\'Association Validation.', erreur);
                this.toastr.error('Erreur lors de l\'Ajout d\'une Validation (Confirmer).\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');

              }
            );
          }

        }

        for(const oold of this.concernededTypesDepense){
          let dele: boolean = true;

          for(const newss of this.selectedTypesDepense){
            if(oold.codeMoD == newss.codeMoD){
              dele = false;
              break;
            }
          }

          if(dele){

            let concernedConf: Confirmer = null;

            for(const confir of this.confirmers){
              if(confir.motifDepense.codeMoD == oold.codeMoD && this.dialogData.associer.idAssocier == confir.associer.idAssocier){
                concernedConf = confir;
                console.log('concerned Confirm', concernedConf);
                break;
              }
            }

            this.serviceUserAgence.deleteAConfirmer(concernedConf.idStatut.toString()).subscribe(
              (data2) => {

              },
              (erreur) => {
                console.log('Erreur lors de l\'Ajout de l\'Association Validation.', erreur);
                this.toastr.error('Erreur lors de la suppression d\'une Validation (Confirmer).\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
              }
            );
          }

        }

        this.dialogRef.close(true);
        this.toastr.success('Modification de l\'Association Utilisateur - Agence effectuée avec Succès', 'Modifier Association');

      },
      (erreur) => {
        console.log('Erreur lors de la Modification de l\'Association Utilisateur - Agence.', erreur);
        this.toastr.error('Erreur lors de la Modification de l\'Association Utilisateur - Agence.\n Code : '+erreur.status+' | '+erreur.statusText, 'Association');
      }
    );
    
    

  }

  

  cliquer(){
    
    if(this.selectedTypesDepense.length == this.typesDepense.length){
      this.selectedTypesDepense = [];
    }
    else {
      this.selectedTypesDepense = this.typesDepense;
    }

    //console.log('valeur', this.selectedTypesDepense);

  }

  cliii(){
    //this.selectedTypesDepense = [this.typesDepense[0]];
    //this.selectedTypesDepenseString.push(this.typesDepenseString[0]);

    console.log('valeur', this.selectedTypesDepense);
  }

  isInConcerned(typeDe: MotifDepense){
    for(const concer of this.concernededTypesDepense){
      if(typeDe.codeMoD == concer.codeMoD){
        return true;
      }
    }

    return false;
  }

}
