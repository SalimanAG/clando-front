import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.css']
})
export class NewUserDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewUserDialogComponent>, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onValiderUserSaveClicked(){
    this.dialogRef.close();
    this.toastr.success('Enrégistrement effectué avec Succès', 'Nouveau Utilisateur');
  }

}
