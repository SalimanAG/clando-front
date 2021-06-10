import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserToAgenceComponent } from './user-to-agence.component';

describe('UserToAgenceComponent', () => {
  let component: UserToAgenceComponent;
  let fixture: ComponentFixture<UserToAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserToAgenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserToAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
