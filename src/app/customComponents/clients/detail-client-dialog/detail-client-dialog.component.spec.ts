import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClientDialogComponent } from './detail-client-dialog.component';

describe('DetailClientDialogComponent', () => {
  let component: DetailClientDialogComponent;
  let fixture: ComponentFixture<DetailClientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailClientDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
