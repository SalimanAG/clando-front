import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssoUserToAgenceDialogComponent } from './new-asso-user-to-agence-dialog.component';

describe('NewAssoUserToAgenceDialogComponent', () => {
  let component: NewAssoUserToAgenceDialogComponent;
  let fixture: ComponentFixture<NewAssoUserToAgenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAssoUserToAgenceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssoUserToAgenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
