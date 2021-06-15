import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collectes',
  templateUrl: './collectes.component.html',
  styleUrls: ['./collectes.component.css']
})
export class CollectesComponent implements OnInit, AfterViewInit {


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
