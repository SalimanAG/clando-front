import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServirTontineComponent } from './servir-tontine.component';

describe('ServirTontineComponent', () => {
  let component: ServirTontineComponent;
  let fixture: ComponentFixture<ServirTontineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServirTontineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServirTontineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
