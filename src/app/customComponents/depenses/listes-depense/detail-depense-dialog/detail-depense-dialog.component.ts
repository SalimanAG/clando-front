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
import { DialogDepenseData1 } from '../listes-depense.component';

@Component({
  selector: 'app-detail-depense-dialog',
  templateUrl: './detail-depense-dialog.component.html',
  styleUrls: ['./detail-depense-dialog.component.css']
})
export class DetailDepenseDialogComponent implements OnInit {

  validateurs: Utilisateur[] = [];
  validateursOui: Utilisateur[] = [];
  validateursNon: Utilisateur[] = [];
  validateursNull: Utilisateur[] = [];


  constructor(public dialogRef: MatDialogRef<DetailDepenseDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceUser:UtilisateurService, private serviceTypeDepense: TypesDepenseService, 
    private serviceUserAgence: AssociationService, private serviceDepense: DepensesService, 
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogDepenseData1) { 
      
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



}
