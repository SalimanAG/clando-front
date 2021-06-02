import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTontineDialogComponent } from './calendar-tontine-dialog.component';

describe('CalendarTontineDialogComponent', () => {
  let component: CalendarTontineDialogComponent;
  let fixture: ComponentFixture<CalendarTontineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarTontineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTontineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
