import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCaisseDialogComponent } from './edit-caisse-dialog.component';

describe('EditCaisseDialogComponent', () => {
  let component: EditCaisseDialogComponent;
  let fixture: ComponentFixture<EditCaisseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCaisseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCaisseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
