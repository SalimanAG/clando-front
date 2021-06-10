import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDepenseDialogComponent } from './new-depense-dialog.component';

describe('NewDepenseDialogComponent', () => {
  let component: NewDepenseDialogComponent;
  let fixture: ComponentFixture<NewDepenseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDepenseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDepenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
