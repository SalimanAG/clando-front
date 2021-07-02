import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatDepenseDialogComponent } from './validat-depense-dialog.component';

describe('ValidatDepenseDialogComponent', () => {
  let component: ValidatDepenseDialogComponent;
  let fixture: ComponentFixture<ValidatDepenseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatDepenseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatDepenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
