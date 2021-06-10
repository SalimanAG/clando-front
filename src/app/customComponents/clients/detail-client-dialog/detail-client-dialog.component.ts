import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogClientData1 } from '../clients.component';


@Component({
  selector: 'app-detail-client-dialog',
  templateUrl: './detail-client-dialog.component.html',
  styleUrls: ['./detail-client-dialog.component.css']
})
export class DetailClientDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:DialogClientData1, 
  public dialogRef: MatDialogRef<DetailClientDialogComponent>) { }

  ngOnInit(): void {
  }

}