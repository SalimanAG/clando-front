import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar-tontine-dialog',
  templateUrl: './calendar-tontine-dialog.component.html',
  styleUrls: ['./calendar-tontine-dialog.component.css']
})
export class CalendarTontineDialogComponent implements OnInit {

  calendarOptions: CalendarOptions;

  constructor() { 
    this.calendarOptions = {
      initialView: 'dayGridMonth'
    };
  }

  ngOnInit(): void {
  }

}
