import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOperCaisseDialogComponent } from './new-oper-caisse-dialog.component';

describe('NewOperCaisseDialogComponent', () => {
  let component: NewOperCaisseDialogComponent;
  let fixture: ComponentFixture<NewOperCaisseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOperCaisseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOperCaisseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
