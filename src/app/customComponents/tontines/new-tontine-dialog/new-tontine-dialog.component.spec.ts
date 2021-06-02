import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTontineDialogComponent } from './new-tontine-dialog.component';

describe('NewTontineDialogComponent', () => {
  let component: NewTontineDialogComponent;
  let fixture: ComponentFixture<NewTontineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTontineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTontineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
