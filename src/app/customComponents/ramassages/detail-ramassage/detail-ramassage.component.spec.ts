import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRamassageComponent } from './detail-ramassage.component';

describe('DetailRamassageComponent', () => {
  let component: DetailRamassageComponent;
  let fixture: ComponentFixture<DetailRamassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRamassageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRamassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
