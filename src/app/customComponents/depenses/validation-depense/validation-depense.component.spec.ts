import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDepenseComponent } from './validation-depense.component';

describe('ValidationDepenseComponent', () => {
  let component: ValidationDepenseComponent;
  let fixture: ComponentFixture<ValidationDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationDepenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
