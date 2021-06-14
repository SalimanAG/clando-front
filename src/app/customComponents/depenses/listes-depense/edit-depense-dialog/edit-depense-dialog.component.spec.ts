import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepenseDialogComponent } from './edit-depense-dialog.component';

describe('EditDepenseDialogComponent', () => {
  let component: EditDepenseDialogComponent;
  let fixture: ComponentFixture<EditDepenseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDepenseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDepenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
