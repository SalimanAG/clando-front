import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TontinesComponent } from './tontines.component';

describe('TontinesComponent', () => {
  let component: TontinesComponent;
  let fixture: ComponentFixture<TontinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TontinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TontinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
