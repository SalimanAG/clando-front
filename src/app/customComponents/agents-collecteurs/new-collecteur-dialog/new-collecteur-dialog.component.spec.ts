import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCollecteurDialogComponent } from './new-collecteur-dialog.component';

describe('NewCollecteurDialogComponent', () => {
  let component: NewCollecteurDialogComponent;
  let fixture: ComponentFixture<NewCollecteurDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCollecteurDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCollecteurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
