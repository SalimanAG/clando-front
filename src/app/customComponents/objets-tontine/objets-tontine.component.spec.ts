import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetsTontineComponent } from './objets-tontine.component';

describe('ObjetsTontineComponent', () => {
  let component: ObjetsTontineComponent;
  let fixture: ComponentFixture<ObjetsTontineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetsTontineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetsTontineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
