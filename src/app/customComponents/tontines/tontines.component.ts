import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-tontines',
  templateUrl: './tontines.component.html',
  styleUrls: ['./tontines.component.css']
})
export class TontinesComponent implements OnInit {

  calendarOptions: CalendarOptions;

  constructor() { 
    this.calendarOptions = {
      initialView: 'dayGridMonth'
    };
  }

  ngOnInit(): void {
  }

}
