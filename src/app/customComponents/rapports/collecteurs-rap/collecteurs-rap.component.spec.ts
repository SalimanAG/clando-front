import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollecteursRapComponent } from './collecteurs-rap.component';

describe('CollecteursRapComponent', () => {
  let component: CollecteursRapComponent;
  let fixture: ComponentFixture<CollecteursRapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollecteursRapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollecteursRapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
