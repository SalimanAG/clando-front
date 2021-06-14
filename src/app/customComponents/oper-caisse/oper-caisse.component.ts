import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Agence } from 'models/agence.model';
import { Caisse } from 'models/caisse.model';
import { ToastrService } from 'ngx-toastr';
import { CaissiereService } from 'services/repertoire/caissiere.service';
import { AgenceService } from 'services/repertoire/agence.service';
//import { EditCaisseDialogComponent } from './edit-caisse-dialog/edit-caisse-dialog.component';
import { NewOperCaisseDialogComponent} from './new-oper-caisse-dialog/new-oper-caisse-dialog.component';


@Component({
  selector: 'app-oper-caisse',
  templateUrl: './oper-caisse.component.html',
  styleUrls: ['./oper-caisse.component.css']
})
export class OperCaisseComponent implements OnInit {

  constructor(public dialog:MatDialog, private serviceCaisse: CaissiereService, 
    private serviceAgence: AgenceService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onNewcaisseBottonClicked(){
    let dialog = this.dialog.open(NewOperCaisseDialogComponent);
    dialog.afterClosed().subscribe(result => {
      //this.getAllcaisse();
      console.log(result);
    });
  }

}
