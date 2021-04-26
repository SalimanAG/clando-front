import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamassagesComponent } from './ramassages.component';

describe('RamassagesComponent', () => {
  let component: RamassagesComponent;
  let fixture: ComponentFixture<RamassagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamassagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RamassagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
