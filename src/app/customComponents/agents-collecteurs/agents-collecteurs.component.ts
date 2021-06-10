import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Associer } from 'models/associer.model';
import { Collecteur } from 'models/collecteur.model';
import { Personne } from 'models/personne.model';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';
import { DetailCollecteurDialogComponent } from './detail-collecteur-dialog/detail-collecteur-dialog.component';
import { EditCollecteurDialogComponent } from './edit-collecteur-dialog/edit-collecteur-dialog.component';
import { NewCollecteurDialogComponent } from './new-collecteur-dialog/new-collecteur-dialog.component';


export interface DialogData1 {
  association: Associer;
}

@Component({
  selector: 'app-agents-collecteurs',
  templateUrl: './agents-collecteurs.component.html',
  styleUrls: ['./agents-collecteurs.component.css']
})
export class AgentsCollecteursComponent implements OnInit, AfterViewInit {
  associations : Associer[]=[];
  assActuel: Associer[] = [];
  isLoadingResults:boolean = false;
  isLoadingPage:boolean = true;
  delAgt: Collecteur = null;
  dataSource : MatTableDataSource<Associer>;

  displayedColumns : String[]= ["nom","prenoms","tel","datArri", "agence", "action"];

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  constructor(public sagec : AgentsCollecteurService,public tst : ToastrService,
    public users : UtilisateurService, public assos : AssociationService,
    public detector : ChangeDetectorRef, public dlg : MatDialog) { 
    this.chargerAssociations()
  }

  ngOnInit(): void {
    this.isLoadingPage=true;
  }

  ngAfterViewInit() {
    this.isLoadingPage = false;
    this.detector.detectChanges();
  }

  chargerAssociations(){
    this.assos.getAllAssocier().subscribe(
      data=>{
        this.associations=data;
        this.assActuel=this.associations.filter(a=>a.datFin==null);
        
        this.dataSource = new MatTableDataSource(this.assActuel);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.isLoadingResults = false;
      },
      err=>{
        this.tst.error('Erreur lors du chargement des agents collecteurs', 'Agent collecteurs');
        console.log(err);
      }
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newCollecteur(){
    let dialog = this.dlg.open(NewCollecteurDialogComponent);
    dialog.afterClosed().subscribe(result => {
      this.chargerAssociations();
    });
  }

  edit(asso: Associer){
    let dat: DialogData1 = { association : asso, };
    
    let dialog = this.dlg.open(EditCollecteurDialogComponent, {
      data: dat, 

    });
    dialog.afterClosed().subscribe(result => {
      if(result == true) this.chargerAssociations();
    });
  }

  onDeleteAUserClicked(col:Collecteur){
    //console.log(user);
    this.delAgt = col;
  }

  detail(asso: Associer){
    let dat: DialogData1 = { association : asso, };
    
    let dialog = this.dlg.open(DetailCollecteurDialogComponent, {
      data: dat, 

    });
  }

  onConfirmUserDelet(): void {
    console.log(this.delAgt);
    let delPers=this.delAgt.personne;
    this.sagec.deleteACollecteur(this.delAgt.idCollecteur.toString()).subscribe(
      (data) => {
        this.users.deleteAPersonne(delPers.idPers.toString()).subscribe(
          (data2) => {
            this.tst.success('Suppression effectuée avec Succès', 'Suppression de collecteur');
            this.chargerAssociations();
          },
          (erreur) => {
            console.log('Erreur lors de la Suppression de Personne.', erreur);
            //this.tst.error('Erreur lors de la Suppression de Personne.\n Code : '+erreur.status+' | '+erreur.statusText, 'Utilisateurs');

          }
        );
      },
      (erreur) => {
        console.log('Erreur lors de la Suppression du collecteur.', erreur);
        this.tst.error('Erreur lors de la Suppression du collecteur.' ,'Suppression de collecteur');

      }
    );
  }


  onAnnulerUserDeleteClicked(): void {
    console.log('Annuler')
  }

  reaffecter(as: Associer){
    console.log('Réaffectation du collecteur');
  }

}
