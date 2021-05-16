import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData1 } from '../utilisateurs.component';

@Component({
  selector: 'app-detail-user-dialog',
  templateUrl: './detail-user-dialog.component.html',
  styleUrls: ['./detail-user-dialog.component.css']
})
export class DetailUserDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:DialogData1, 
  public dialogRef: MatDialogRef<DetailUserDialogComponent>) { }

  ngOnInit(): void {
  }

}
