import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Agence } from 'models/agence.model';
import { Associer } from 'models/associer.model';
import { Depense } from 'models/depense.model';
import { MotifDepense } from 'models/motifDepense.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { TypesDepenseService } from 'services/administration/types-depense.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { DepensesService } from 'services/enregistrement/depenses.service';
import { DetailDepenseDialogComponent } from './detail-depense-dialog/detail-depense-dialog.component';
import { EditDepenseDialogComponent } from './edit-depense-dialog/edit-depense-dialog.component';
import { NewDepenseDialogComponent } from './new-depense-dialog/new-depense-dialog.component';

export interface DialogDepenseData1 {
  depense: Depense;
  
}

@Component({
  selector: 'app-listes-depense',
  templateUrl: './listes-depense.component.html',
  styleUrls: ['./listes-depense.component.css']
})
export class ListesDepenseComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['numDep', 'dateDep', 'agence', 'beneficiaire', 'motif', 'montant', 'action'];
  dataSource: MatTableDataSource<Depense>;
  depenses: Depense[] = [];
  motifDepenses: MotifDepense[] = [];
  associers: Associer[];
  agencesOfConnectedUser: Agence[] = [];
  
  isLoadingResults: boolean = false;
  deleteDepense: Depense = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  scrollStrategy;

  constructor(public dialog:MatDialog, private serviceDepense:DepensesService, private toastr: ToastrService, 
    private serviceTypeDepense: TypesDepenseService, private serviceUserAgence: AssociationService, 
    private serviceUser: UtilisateurService, private overlay: Overlay) {

    this.getAllDepense();

    this.scrollStrategy = this.overlay.scrollStrategies.reposition();
    
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
        this.serviceUserAgence.getAllAssocier().subscribe(
          (data2) => {

            let tab : Depense[] = [];

            data.forEach(element => {
              let finded = false;

              for(const asso of data2){
                if(element.agence.codAgence == asso.agence.codAgence && asso.pers.idPers == this.serviceUser.connectedUser.personne.idPers){
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
            console.log('Erreur lors de récupération de la liste des Associations', erreur);
            this.isLoadingResults = false;
            this.toastr.error('Erreur lors de la récupération de liste des Associations d\'Utilisateurs à Agence.\n Code : '+erreur.status+' | '+erreur.statusText, 'Dépense');

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

  onNewDepenseBottonClicked(){
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    let dialog = this.dialog.open(NewDepenseDialogComponent, { 
      autoFocus: false,
      scrollStrategy 
    });
    dialog.afterClosed().subscribe(result => {
      this.getAllDepense();
      //console.log(result);
    });
  }

  onModifADepenseClicked(depen:Depense){

    let dat: DialogDepenseData1 = {depense: depen, };
    
    let dialog = this.dialog.open(EditDepenseDialogComponent, {
      data: dat, 

    });
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.getAllDepense();

    });
  }

  onDeleteADepenseClicked(depen:Depense){
    //console.log(user);
    this.deleteDepense = depen;
  }

  onInfosADepenseClicked(depen:Depense){
    //console.log(user);
    let dat: DialogDepenseData1 = {depense: depen, };
    
    let dialog = this.dialog.open(DetailDepenseDialogComponent, {
      data: dat, 

    });

  }

  onConfirmDepenseDelet(): void {
    //console.log(this.deleteUtilisateurAgence);
    
    this.serviceDepense.deleteADepense(this.deleteDepense.numDep.toString()).subscribe(
      (data) => {
        this.toastr.success('Suppression de la dépense effectuée avec Succès', 'Dépense');
        this.getAllDepense();
      },
      (erreur) => {
        console.log('Erreur lors de la Suppression de la dépense.', erreur);
        this.toastr.error('Erreur lors de la Suppression de la dépense.\n Code : '+erreur.status+' | '+erreur.statusText, 'Dépense');

      }
    );


  }


  onAnnulerUserAgenceDeleteClicked(): void {
    console.log('Annuler')
  }

}
