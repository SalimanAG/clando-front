import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Objet } from 'models/objet.model';
import { ToastrService } from 'ngx-toastr';
import { ObjetsTontineService } from 'services/repertoire/objets-tontine.service';

@Component({
  selector: 'app-new-objet-tontine-dialog',
  templateUrl: './new-objet-tontine-dialog.component.html',
  styleUrls: ['./new-objet-tontine-dialog.component.css']
})
export class NewObjetTontineDialogComponent implements OnInit {

  addAObjetTontiForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<NewObjetTontineDialogComponent>, private toastr: ToastrService,
    private bulder: FormBuilder,  private serviceObjet:ObjetsTontineService) { 
      this.addAObjetTontiForm = bulder.group({
        libelle: ['', Validators.required],
        composition: ['', Validators.required],
        natLot: ['', Validators.required],
        
      })
  }

  ngOnInit(): void {
  }

  onValiderObjetSaveClicked(){
    let newObjet: Objet = new Objet(this.addAObjetTontiForm.value['composition'], this.addAObjetTontiForm.value['libelle'], 
    this.addAObjetTontiForm.value['natLot']);
    //console.log(newObjet);
    this.serviceObjet.addAObjet(newObjet).subscribe(
      (data) => {
        //console.log(data);
        this.dialogRef.close(true);
        this.toastr.success('Enrégistrement effectué avec Succès', 'Nouveau Objet de Tontine');

      },
      (erreur) => {
        console.log('Erreur lors de l\'Ajout de l\'Objet de Tontine.', erreur);
        this.toastr.error('Erreur lors de l\'Ajout de l\'Objet de Tontine.\n Code : '+erreur.status+' | '+erreur.statusText, 'Objet de Tontine');
      }
    );
    
    

  }


}
