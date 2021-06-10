import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MotifDepense } from 'models/motifDepense.model';
import { ToastrService } from 'ngx-toastr';
import { TypesDepenseService } from 'services/administration/types-depense.service';
import { DialogTypeDepenseData1 } from '../type-depense.component';

@Component({
  selector: 'app-edit-type-depense-dialog',
  templateUrl: './edit-type-depense-dialog.component.html',
  styleUrls: ['./edit-type-depense-dialog.component.css']
})
export class EditTypeDepenseDialogComponent implements OnInit {

  editATypeDepenseForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<EditTypeDepenseDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder,  private serviceTypeDepense:TypesDepenseService, 
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogTypeDepenseData1) { 
      this.editATypeDepenseForm = bulder.group({
        codMoD: ['', Validators.required],
        libMoD: ['', Validators.required],
        
      })
  }

  ngOnInit(): void {
  }

  onValiderTypeDepenseClicked(){

    let newTypeDepense: MotifDepense = new MotifDepense(this.editATypeDepenseForm.value['codMoD'], this.editATypeDepenseForm.value['libMoD']);
    //console.log(newObjet);
    this.serviceTypeDepense.editAMotifDepense(this.dialogData.typeDepense.codeMoD.toString(), newTypeDepense).subscribe(
      (data) => {
        //console.log(data);
        this.dialogRef.close(true);
        this.toastr.success('Modification effectuée avec Succès', 'Modifier Type de Dépense');

      },
      (erreur) => {
        console.log('Erreur lors de la modification du Type Dépense.', erreur);
        this.toastr.error('Erreur lors de la Modification du Type de Dépense.\n Code : '+erreur.status+' | '+erreur.statusText, 'Type de Dépense');
      }
    );
    
    

  }


}
