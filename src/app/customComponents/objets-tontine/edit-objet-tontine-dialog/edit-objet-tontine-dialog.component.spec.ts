import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObjetTontineDialogComponent } from './edit-objet-tontine-dialog.component';

describe('EditObjetTontineDialogComponent', () => {
  let component: EditObjetTontineDialogComponent;
  let fixture: ComponentFixture<EditObjetTontineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditObjetTontineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObjetTontineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
