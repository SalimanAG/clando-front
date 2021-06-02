import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingAgenceDlgComponent } from './adding-agence-dlg.component';

describe('AddingAgenceDlgComponent', () => {
  let component: AddingAgenceDlgComponent;
  let fixture: ComponentFixture<AddingAgenceDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingAgenceDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingAgenceDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
