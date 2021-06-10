import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollecteurDialogComponent } from './edit-collecteur-dialog.component';

describe('EditCollecteurDialogComponent', () => {
  let component: EditCollecteurDialogComponent;
  let fixture: ComponentFixture<EditCollecteurDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCollecteurDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCollecteurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
