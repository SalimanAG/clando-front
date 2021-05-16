import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Objet } from 'models/objet.model';
import { ToastrService } from 'ngx-toastr';
import { ObjetsTontineService } from 'services/repertoire/objets-tontine.service';
import { DialogObjTontData1 } from '../objets-tontine.component';

@Component({
  selector: 'app-edit-objet-tontine-dialog',
  templateUrl: './edit-objet-tontine-dialog.component.html',
  styleUrls: ['./edit-objet-tontine-dialog.component.css']
})
export class EditObjetTontineDialogComponent implements OnInit {

  editAObjetTontiForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<EditObjetTontineDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder,  private serviceObjet:ObjetsTontineService, 
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogObjTontData1) { 
      this.editAObjetTontiForm = bulder.group({
        descri: ['', Validators.required],
        composition: ['', Validators.required],
        
      })
  }

  ngOnInit(): void {
  }

  onValiderObjetEditClicked(){

    let newObjet: Objet = new Objet(this.editAObjetTontiForm.value['descri'], this.editAObjetTontiForm.value['composition']);
    console.log(newObjet);
    this.serviceObjet.editAObjet(this.dialogData.objTonti.idObjet.toString(), newObjet).subscribe(
      (data) => {
        console.log(data);
        this.dialogRef.close(true);
        this.toastr.success('Modification effectuée avec Succès', 'Modifier Objet de Tontine');

      },
      (erreur) => {
        console.log('Erreur lors de la modification de l\'Objet de Tontine.', erreur);
        this.toastr.error('Erreur lors de la Modification de l\'Objet de Tontine.\n Code : '+erreur.status+' | '+erreur.statusText, 'Objet de Tontine');
      }
    );
    
    

  }


}
