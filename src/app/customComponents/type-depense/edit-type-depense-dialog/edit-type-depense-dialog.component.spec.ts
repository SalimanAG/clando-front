import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeDepenseDialogComponent } from './edit-type-depense-dialog.component';

describe('EditTypeDepenseDialogComponent', () => {
  let component: EditTypeDepenseDialogComponent;
  let fixture: ComponentFixture<EditTypeDepenseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTypeDepenseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeDepenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
