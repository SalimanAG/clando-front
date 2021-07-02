import { NonNullAssert } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utilisateur } from 'models/utilisataeur.model';
import { Valider } from 'models/valider.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { TypesDepenseService } from 'services/administration/types-depense.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { DepensesService } from 'services/enregistrement/depenses.service';
import { DialogDepenseData2 } from '../validation-depense.component';

@Component({
  selector: 'app-validat-depense-dialog',
  templateUrl: './validat-depense-dialog.component.html',
  styleUrls: ['./validat-depense-dialog.component.css']
})
export class ValidatDepenseDialogComponent implements OnInit {

  validateurs: Utilisateur[] = [];
  validateursOui: Utilisateur[] = [];
  validateursNon: Utilisateur[] = [];
  validateursNull: Utilisateur[] = [];

  userValidation: Valider = null;

  modeValidation: boolean = false;

  commentaire: String = null;

  constructor(public dialogRef: MatDialogRef<ValidatDepenseDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceUser:UtilisateurService, private serviceTypeDepense: TypesDepenseService, 
    private serviceUserAgence: AssociationService, private serviceDepense: DepensesService, 
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogDepenseData2) { 
      
      this.serviceUserAgence.getAllConfirmer().subscribe(
        (data) => {

          this.serviceDepense.getAllValidation().subscribe(
            (data2) => {
              
              this.serviceUser.getAllUtilisateurs().subscribe(
                (data3) => {
                  
                  let tab: Utilisateur[] = [];
                  let tabOui: Utilisateur[] = [];
                  let tabNon: Utilisateur[] = [];
                  let tabNull: Utilisateur[] = [];

                  for(const confi of data){
                    if(confi.associer.agence.codAgence == dialogData.depense.agence.codAgence 
                      && confi.motifDepense.codeMoD == dialogData.depense.motif.codeMoD){

                        const i1 = data3.findIndex(l => (l.personne.idPers == confi.associer.pers.idPers));

                        if(i1 > -1){
                          tab.push(data3[i1]);
                        }

                        let exis: boolean = false;
                        let vaa: Valider = null;
                        for(const vali of data2){
                          if(vali.utilisateur.idUser == data3[i1].idUser 
                            && vali.depense.numDep == dialogData.depense.numDep){
                              vaa = vali;
                              break;
                          }
                        }

                        if(vaa){

                          if(vaa.utilisateur.idUser == serviceUser.connectedUser.idUser){
                            this.userValidation = vaa;
                            this.commentaire = vaa.titre;
                            this.modeValidation = true;
                          } 

                          if(vaa.avis && vaa.avis == 'V'){
                            tabOui.push(data3[i1]);
                          }
                          else if(vaa.avis && vaa.avis == 'R'){
                            tabNon.push(data3[i1]);
                          }
                          else{
                            tabNull.push(data3[i1]);
                          }
                        }
                        else{
                          tabNull.push(data3[i1]);
                        }

                      }

                  }

                  this.validateurs = tab;
                  this.validateursOui = tabOui;
                  this.validateursNon = tabNon;
                  this.validateursNull = tabNull;

                  console.log('tab', tab, 'Oui', tabOui, 'Non', tabNon, 'Aucun', tabNull);

                },
                (erreur) => {
                  console.log('Erreur lors de récupération de la liste des Type de Dépense', erreur);
                  
                }
              );

            },
            (erreur) => {
              console.log('Erreur lors de récupération de la liste des Type de Dépense', erreur);
              
            }
          );

        },
        (erreur) => {
          console.log('Erreur lors de récupération de la liste des Type de Dépense', erreur);
          
        }
      );

  }

  ngOnInit(): void {

  }

  getAllTypeDepenses(){
    
    this.serviceTypeDepense.getAllMotifDepenses().subscribe(
      (data) => {
        

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Type de Dépense', erreur);
        
      }
    );
  }

  getAllAgence(){
    
    this.serviceUserAgence.getAllAssocier().subscribe(
      (data) => {
        

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Agences', erreur);
        
      }
    );
  }


  onConfirmAvis(avis: String){

    if(this.userValidation){
      this.serviceDepense.editAValidation(this.userValidation.idValider.toString(), new Valider(new Date, avis, this.commentaire, this.serviceUser.connectedUser, this.dialogData.depense)).subscribe(
        (data) => {
          this.dialogRef.close(true);
          this.toastr.success('Avis enrégistré avec succès', 'Dépense');
        },
        (erreur) => {
          console.log('Erreur lors de l\'Enrégistrement de l\'Avis.', erreur);
          this.toastr.error('Erreur lors de l\Enrégistrement de Votre Avis.\n Code : '+erreur.status+' | '+erreur.statusText, 'Dépense');

        }
      );
    }
    else{

      this.serviceDepense.saveAValidation(new Valider(new Date, avis, this.commentaire, this.serviceUser.connectedUser, this.dialogData.depense)).subscribe(
        (data) => {
          this.dialogRef.close(true);
          this.toastr.success('Avis enrégistré avec succès', 'Dépense');
        },
        (erreur) => {
          console.log('Erreur lors de l\'Enrégistrement de l\'Avis.', erreur);
          this.toastr.error('Erreur lors de l\Enrégistrement de Votre Avis.\n Code : '+erreur.status+' | '+erreur.statusText, 'Dépense');

        }
      );
    }    
    
  }



}
