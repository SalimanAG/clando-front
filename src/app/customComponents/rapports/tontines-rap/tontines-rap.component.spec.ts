import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TontinesRapComponent } from './tontines-rap.component';

describe('TontinesRapComponent', () => {
  let component: TontinesRapComponent;
  let fixture: ComponentFixture<TontinesRapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TontinesRapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TontinesRapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
