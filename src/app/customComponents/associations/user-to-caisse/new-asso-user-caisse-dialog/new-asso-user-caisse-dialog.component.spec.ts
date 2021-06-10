import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssoUserCaisseDialogComponent } from './new-asso-user-caisse-dialog.component';

describe('NewAssoUserCaisseDialogComponent', () => {
  let component: NewAssoUserCaisseDialogComponent;
  let fixture: ComponentFixture<NewAssoUserCaisseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAssoUserCaisseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssoUserCaisseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
