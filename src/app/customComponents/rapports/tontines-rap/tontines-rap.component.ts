import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tontines-rap',
  templateUrl: './tontines-rap.component.html',
  styleUrls: ['./tontines-rap.component.css']
})
export class TontinesRapComponent implements OnInit, AfterViewInit {


  isLoadingPage:boolean = true;
  panelOpenState = false;


  constructor(private cdRef:ChangeDetectorRef) { }

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

  

}
