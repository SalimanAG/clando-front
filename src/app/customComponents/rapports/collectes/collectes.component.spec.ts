import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectesComponent } from './collectes.component';

describe('CollectesComponent', () => {
  let component: CollectesComponent;
  let fixture: ComponentFixture<CollectesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
