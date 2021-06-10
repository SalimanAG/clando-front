import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssoUserCaisseDialogComponent } from './edit-asso-user-caisse-dialog.component';

describe('EditAssoUserCaisseDialogComponent', () => {
  let component: EditAssoUserCaisseDialogComponent;
  let fixture: ComponentFixture<EditAssoUserCaisseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAssoUserCaisseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssoUserCaisseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
