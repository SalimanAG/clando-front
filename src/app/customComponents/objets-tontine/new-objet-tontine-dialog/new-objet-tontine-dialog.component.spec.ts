import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewObjetTontineDialogComponent } from './new-objet-tontine-dialog.component';

describe('NewObjetTontineDialogComponent', () => {
  let component: NewObjetTontineDialogComponent;
  let fixture: ComponentFixture<NewObjetTontineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewObjetTontineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewObjetTontineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
