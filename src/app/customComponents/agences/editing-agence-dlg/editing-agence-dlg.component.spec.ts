import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingAgenceDlgComponent } from './editing-agence-dlg.component';

describe('EditingAgenceDlgComponent', () => {
  let component: EditingAgenceDlgComponent;
  let fixture: ComponentFixture<EditingAgenceDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditingAgenceDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingAgenceDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
