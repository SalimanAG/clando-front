import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {jsPDF} from 'jspdf';


export interface DialogPdfViewData1{
  pdf?: any;
  nomFile?: String;
}



@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {

  pdfToShow: any = '';
  

  constructor(public dialogRef: MatDialogRef<PdfViewerComponent>,  private sanitizer:DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogPdfViewData1) { 
      if(!dialogData || !dialogData.nomFile){
        dialogData = {pdf : null, nomFile : 'fichierAdjonu'+(new Date())};
      }


      

      

  }

  ngOnInit(): void {
    if(this.dialogData && this.dialogData.pdf){
      this.pdfToShow = this.sanitizer.bypassSecurityTrustResourceUrl(this.dialogData.pdf.output('datauristring', {filename: this.dialogData.nomFile+'.pdf'}));
    }
    else {
      const doc = new jsPDF();
      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(50, 20, 110, 15, 3, 3, 'FD');
      doc.setFontSize(25);
      doc.text('RAPPORT', 59, 30);
      this.pdfToShow = this.sanitizer.bypassSecurityTrustResourceUrl(doc.output('datauristring'));
      
    }
  }


}
