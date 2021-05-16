import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agences',
  templateUrl: './agences.component.html',
  styleUrls: ['./agences.component.css']
})
export class AgencesComponent implements OnInit, AfterViewInit {

  isLoadingPage:boolean = true;

  constructor() { 
    
  }

  ngOnInit(): void {
    this.isLoadingPage = true;
  }

  ngAfterViewInit() {
    this.isLoadingPage = false;
  }

}
