import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserToCaisseComponent } from './user-to-caisse.component';

describe('UserToCaisseComponent', () => {
  let component: UserToCaisseComponent;
  let fixture: ComponentFixture<UserToCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserToCaisseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserToCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
