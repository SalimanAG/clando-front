import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCollecteurDialogComponent } from './detail-collecteur-dialog.component';

describe('DetailCollecteurDialogComponent', () => {
  let component: DetailCollecteurDialogComponent;
  let fixture: ComponentFixture<DetailCollecteurDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCollecteurDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCollecteurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
