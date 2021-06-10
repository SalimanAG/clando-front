import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTypeDepenseDialogComponent } from './new-type-depense-dialog.component';

describe('NewTypeDepenseDialogComponent', () => {
  let component: NewTypeDepenseDialogComponent;
  let fixture: ComponentFixture<NewTypeDepenseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTypeDepenseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTypeDepenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
