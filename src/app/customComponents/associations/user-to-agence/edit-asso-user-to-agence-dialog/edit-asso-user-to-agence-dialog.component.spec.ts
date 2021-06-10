import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssoUserToAgenceDialogComponent } from './edit-asso-user-to-agence-dialog.component';

describe('EditAssoUserToAgenceDialogComponent', () => {
  let component: EditAssoUserToAgenceDialogComponent;
  let fixture: ComponentFixture<EditAssoUserToAgenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAssoUserToAgenceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssoUserToAgenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
