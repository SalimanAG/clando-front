import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MotifDepense } from 'models/motifDepense.model';
import { TypesDepenseService } from 'services/administration/types-depense.service';

@Component({
  selector: 'app-new-type-depense-dialog',
  templateUrl: './new-type-depense-dialog.component.html',
  styleUrls: ['./new-type-depense-dialog.component.css']
})
export class NewTypeDepenseDialogComponent implements OnInit {

  addATypeDepenseForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<NewTypeDepenseDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder, private serviceTypeDepense:TypesDepenseService) { 
      this.addATypeDepenseForm = bulder.group({
        codMoD: ['', Validators.required],
        libMoD: ['', Validators.required],
        
      })
  }

  ngOnInit(): void {
  }

  onValiderTypeDepenseSaveClicked(){
    let newTypeDepense: MotifDepense = new MotifDepense(this.addATypeDepenseForm.value['codMoD'], this.addATypeDepenseForm.value['libMoD']);
    console.log(newTypeDepense);
    this.serviceTypeDepense.addAMotifDepense(newTypeDepense).subscribe(
      (data) => {
        //console.log(data);
        this.dialogRef.close(true);
        this.toastr.success('Enrégistrement effectué avec Succès', 'Nouveau Type de Dépense');

      },
      (erreur) => {
        console.log('Erreur lors de l\'Ajout du Type de Dépense.', erreur);
        this.toastr.error('Erreur lors de l\'Ajout du Type de Dépense.\n Code : '+erreur.status+' | '+erreur.statusText, 'Type de Dépense');
      }
    );
    
    

  }


}
