import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.css']
})
export class AssociationsComponent implements OnInit, AfterViewInit {


  isLoadingPage:boolean = true;


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
