import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Agence } from 'models/agence.model';
import { Associer } from 'models/associer.model';
import { Confirmer } from 'models/confirmer.model';
import { Depense } from 'models/depense.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { TypesDepenseService } from 'services/administration/types-depense.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { DepensesService } from 'services/enregistrement/depenses.service';
import { ValidatDepenseDialogComponent } from './validat-depense-dialog/validat-depense-dialog.component';

export interface DialogDepenseData2 {
  depense: Depense;
  
}

@Component({
  selector: 'app-validation-depense',
  templateUrl: './validation-depense.component.html',
  styleUrls: ['./validation-depense.component.css']
})
export class ValidationDepenseComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['numDep', 'dateDep', 'agence', 'beneficiaire', 'motif', 'montant', 'action'];
  dataSource: MatTableDataSource<Depense>;
  depenses: Depense[] = [];
  associers: Associer[] = [];
  confirmers: Confirmer[] = [];
  agencesOfConnectedUser: Agence[] = [];
  
  isLoadingResults: boolean = false;
  deleteDepense: Depense = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog:MatDialog, private serviceDepense:DepensesService, private toastr: ToastrService, 
    private serviceTypeDepense: TypesDepenseService, private serviceUserAgence: AssociationService, 
    private serviceUser: UtilisateurService) {

    this.getAllDepense();
    
  }
  ngOnInit(): void {
    //this.isLoadingPage = true;
  }

  ngAfterViewInit() {
    //this.isLoadingPage = false;
  }


  getAllDepense(){
    this.isLoadingResults = true;
    this.serviceDepense.getAllDepense().subscribe(
      (data) => {
        this.serviceUserAgence.getAllConfirmer().subscribe(
          (data3) => {
            let tab : Depense[] = [];

            data.forEach(element => {
              let finded = false;

              for (const confi of data3){
                if(confi.associer.agence.codAgence == element.agence.codAgence 
                  && confi.associer.pers.idPers == this.serviceUser.connectedUser.personne.idPers 
                  && confi.motifDepense.codeMoD == element.motif.codeMoD 
                  && !element.opCaisse){
                    finded = true;
                    break;

                  }
              }

              if(finded){
                tab.push(element);
              }

            });

            this.depenses = tab;
            this.dataSource = new MatTableDataSource(this.depenses);
            
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.isLoadingResults = false;

          },
          (erreur) => {
            console.log('Erreur lors de récupération de la liste des Confirmations', erreur);
            this.isLoadingResults = false;
            this.toastr.error('Erreur lors de la récupération de liste des Confirmations de l\'Utilisateurs.\n Code : '+erreur.status+' | '+erreur.statusText, 'Dépense');

          }
        );

      },
      (erreur) => {
        console.log('Erreur lors de récupération de la liste des Dépenses', erreur);
        this.isLoadingResults = false;
        this.toastr.error('Erreur lors de la récupération de liste des Dépenses.\n Code : '+erreur.status+' | '+erreur.statusText, 'Dépense');
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    console.log(this.dataSource);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  onInfosADepenseClicked(depen:Depense){
    let dat: DialogDepenseData2 = {depense: depen, };
    
    let dialog = this.dialog.open(ValidatDepenseDialogComponent, {
      data: dat, 

    });
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.getAllDepense();

    });

  }



}
