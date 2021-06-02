import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { data } from 'jquery';
import { Agence } from 'models/agence.model';
import { ToastrService } from 'ngx-toastr';
import { AgenceService } from 'services/repertoire/agence.service';

@Component({
  selector: 'app-adding-agence-dlg',
  templateUrl: './adding-agence-dlg.component.html',
  styleUrls: ['./adding-agence-dlg.component.css']
})
export class AddingAgenceDlgComponent implements OnInit {

  addAgence:FormGroup;
  constructor(public dialogRef: MatDialogRef<AddingAgenceDlgComponent>, public toastr: ToastrService,
    public bulder: FormBuilder,  public ages:AgenceService) { 
      this.addAgence=  this.bulder.group({
        codAge : new FormControl(''),
        libAge : new FormControl(''),
        datAge : new FormControl(new Date()),
        adrAge : new FormControl('')
      });
    }

  ngOnInit(): void {
  }

  valider(){
    var newAgence  = new Agence(this.addAgence.value['codAge'], this.addAgence.value['libAge'],
    this.addAgence.value['datAge'],this.addAgence.value['adrAge'])
    this.ages.addAnAgence(newAgence).subscribe(
      data=>{
        this.toastr.show('Agence','Ajout réussi de la nouvelle agence');
        this.dialogRef.close(true);
      },
      err=>{
        this.toastr.error('Agence','Ajout échoué de la nouvelleagence\n',err)
      }
    );
  }
}
