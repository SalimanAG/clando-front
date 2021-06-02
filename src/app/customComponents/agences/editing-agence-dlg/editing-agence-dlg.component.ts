import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { data } from 'jquery';
import { Agence } from 'models/agence.model';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { AgenceService } from 'services/repertoire/agence.service';
import {dialogAgence } from '../agences.component'

@Component({
  selector: 'app-editing-agence-dlg',
  templateUrl: './editing-agence-dlg.component.html',
  styleUrls: ['./editing-agence-dlg.component.css']
})
export class EditingAgenceDlgComponent implements OnInit {

  agce= new Agence('','',null,'');
  editAgenceForm: FormGroup
  constructor(public dialogRef: MatDialogRef<EditingAgenceDlgComponent>, private toastr: ToastrService,
    private builder: FormBuilder,  private serage:AgenceService, 
    @Inject(MAT_DIALOG_DATA) public dialogData:dialogAgence){
    this.editAgenceForm=builder.group({
      codA: new FormControl(),
      libA: new FormControl(),
      locA: new FormControl(),
      datA: new FormControl(),
    });
   }

  ngOnInit(): void {
  }

  toEditAgence(){
    let newAgce: Agence = new Agence(this.editAgenceForm.value['codA'], this.editAgenceForm.value['libA'],
    this.editAgenceForm.value['datA'], this.editAgenceForm.value['locA']);
    console.log(newAgce);
    this.serage.editAnAgence(this.dialogData.agce.codAgence.toString(), newAgce).subscribe(
      (data) => {
        this.toastr.success('Modification effectuée avec Succès', 'Modifier agence');
        //this.
        this.dialogRef.close(true);

      },
      (erreur) => {
        console.log('Erreur lors de la modification de l\'agence.', erreur);
        this.toastr.error('Erreur lors de la Modification de l\'Objet de Tontine.\n Code : '+erreur.status+' | '+erreur.statusText, 'Objet de Tontine');
      }
    );
  }

}
