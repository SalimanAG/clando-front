import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { data } from 'jquery';
import { Agence } from 'models/agence.model';
import { Caisse } from 'models/caisse.model';
import { Depense } from 'models/depense.model';
import { MotifDepense } from 'models/motifDepense.model';
import { OpCaisse } from 'models/opcaisse.model';
import { TypeOpCaisse } from 'models/typeop.model';
import  * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AssociationService } from 'services/administration/association.service';
import { UtilisateurService } from 'services/administration/utilisateur.service';
import { DepensesService } from 'services/enregistrement/depenses.service';
import { OperCaisseService } from 'services/enregistrement/oper-caisse.service';
import { AgentsCollecteurService } from 'services/repertoire/agents-collecteur.service';

@Component({
  selector: 'app-new-depense',
  templateUrl: './new-depense.component.html',
  styleUrls: ['./new-depense.component.css']
})
export class NewDepenseComponent implements OnInit {

  addDepenseForm:FormGroup;
  objetsAgence: Agence[] = [];
  objetsCaisse: Caisse[] = [];
  depenses: Depense[] = [];
  depensesPayees: Depense[] = [];
  depensesV: Depense[] = [];
  motifDepense: MotifDepense[] = [];
  //affectations: Affecter[] = [];
  etat : boolean;
  total : number = 0;
  @ViewChild(MatSort) maSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['ben', 'desc', 'mtt', 'choix'];
  dataSource: MatTableDataSource<Depense>;
  constructor(public servOp: OperCaisseService, public user: UtilisateurService,
    public serCol : AgentsCollecteurService, public tst : ToastrService,
    public dlg: MatDialog, public bulder : FormBuilder, public asso: AssociationService,
    public dlgRef : MatDialogRef<NewDepenseComponent>, public dps : DepensesService,
    public detetor: ChangeDetectorRef) { 
      this.getAllUC(); 
      this.getAllDepense(); 
      
      this.addDepenseForm = bulder.group({
        dateOp: [moment(Date.now()).format('YYYY-MM-DDTHH:mm'), Validators.required],
        caisse: [0, Validators.required]
      });
    }

  ngOnInit(): void {
  }
  
  considerer(dep : Depense){
    if(this.etat){
      this.depensesPayees.push(dep);
    }
    else{
      this.depensesPayees.splice(this.depensesPayees.indexOf(dep));
    }
    this.total=this.depensesPayees.reduce((s, d)=>s+=d.montant,0);
    
  }

  getAllUC(){
    this.asso.getAllUserCaisse().subscribe(
      datauc=>{
        this.objetsCaisse=datauc.filter(uc=>uc.utilisateur.idUser == 
          this.user.connectedUser.idUser && uc.dateDepart == null).map(c=>c.caisse);
      }
    );
  }

  filtreDepense(){
    console.log(this.addDepenseForm.value['caisse']);
    let c=this.addDepenseForm.value['caisse'];
    this.depensesV=this.depenses.filter(d=>d.agence.codAgence == c.agence.codAgence 
      && d.etatValide == true);
    console.log(this.depensesV);
    
    this.dataSource=new MatTableDataSource(this.depensesV);
  }

  getAllDepense(){
    this.dps.getAllDepense().subscribe(
      datadep=>{
        this.depenses=datadep;
        console.log(this.depenses);
        
      }
    );
  }

  save(){
    let op:OpCaisse=new OpCaisse(this.addDepenseForm.value['dateOp'],
      new TypeOpCaisse('4', 'Dépense','Dépense'),
      1,true,new Date(),this.user.connectedUser, this.addDepenseForm.value['caisse']);
    if(this.addDepenseForm.value['dateOp']!=null && this.addDepenseForm.value['caisse']!= null)
    {
      this.servOp.addAnOpCaisse(op).subscribe(
        dataOp=>{
          this.depensesPayees.forEach(element => {
            element.opCaisse=dataOp;
            this.dps.editADepense(element.numDep.toString(), element).subscribe(
              dataDps=>{this.depensesPayees.splice(this.depensesPayees.indexOf(element));
                if(this.depensesPayees.length==0){
                  this.tst.success('Dépense a été éffectuée avec succès','Opération de caisse');
                  this.dlgRef.close()
                }
            });
          });
        }
      );
    }
  }


}
