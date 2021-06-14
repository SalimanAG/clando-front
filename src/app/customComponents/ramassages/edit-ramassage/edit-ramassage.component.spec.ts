import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRamassageComponent } from './edit-ramassage.component';

describe('EditRamassageComponent', () => {
  let component: EditRamassageComponent;
  let fixture: ComponentFixture<EditRamassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRamassageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRamassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
