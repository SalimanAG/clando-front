import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRamassageComponent } from './new-ramassage.component';

describe('NewRamassageComponent', () => {
  let component: NewRamassageComponent;
  let fixture: ComponentFixture<NewRamassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRamassageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRamassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
