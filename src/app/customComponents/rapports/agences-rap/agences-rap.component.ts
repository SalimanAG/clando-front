import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerComponent } from 'app/customComponents/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-agences-rap',
  templateUrl: './agences-rap.component.html',
  styleUrls: ['./agences-rap.component.css']
})
export class AgencesRapComponent implements OnInit, AfterViewInit {


  isLoadingPage:boolean = true;
  panelOpenState = false;


  constructor(private cdRef:ChangeDetectorRef, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.isLoadingPage = true;
    this.cdRef.detectChanges();
    console.log('init', this.isLoadingPage);
  }

  ngAfterViewInit() {
    this.isLoadingPage = false;
    this.cdRef.detectChanges();
    console.log('init2', this.isLoadingPage);
  }

  openDialog(){
    this.dialog.open(PdfViewerComponent, {
      width: '80%'
    });
  }

  

}
