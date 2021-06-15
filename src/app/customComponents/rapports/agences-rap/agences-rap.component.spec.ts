import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencesRapComponent } from './agences-rap.component';

describe('AgencesRapComponent', () => {
  let component: AgencesRapComponent;
  let fixture: ComponentFixture<AgencesRapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencesRapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencesRapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
