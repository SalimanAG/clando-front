import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTontineDialogComponent } from './edit-tontine-dialog.component';

describe('EditTontineDialogComponent', () => {
  let component: EditTontineDialogComponent;
  let fixture: ComponentFixture<EditTontineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTontineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTontineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
