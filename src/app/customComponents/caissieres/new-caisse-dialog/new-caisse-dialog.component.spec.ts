import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaisseDialogComponent } from './new-caisse-dialog.component';

describe('NewCaisseDialogComponent', () => {
  let component: NewCaisseDialogComponent;
  let fixture: ComponentFixture<NewCaisseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCaisseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCaisseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
