import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsCollecteursComponent } from './agents-collecteurs.component';

describe('AgentsCollecteursComponent', () => {
  let component: AgentsCollecteursComponent;
  let fixture: ComponentFixture<AgentsCollecteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentsCollecteursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsCollecteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
