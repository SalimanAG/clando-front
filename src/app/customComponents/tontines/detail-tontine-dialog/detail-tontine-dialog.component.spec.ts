import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTontineDialogComponent } from './detail-tontine-dialog.component';

describe('DetailTontineDialogComponent', () => {
  let component: DetailTontineDialogComponent;
  let fixture: ComponentFixture<DetailTontineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTontineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTontineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
