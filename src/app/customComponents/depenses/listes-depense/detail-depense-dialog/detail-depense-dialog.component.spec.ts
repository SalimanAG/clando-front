import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDepenseDialogComponent } from './detail-depense-dialog.component';

describe('DetailDepenseDialogComponent', () => {
  let component: DetailDepenseDialogComponent;
  let fixture: ComponentFixture<DetailDepenseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDepenseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDepenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
