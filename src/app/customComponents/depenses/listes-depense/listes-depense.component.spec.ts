import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesDepenseComponent } from './listes-depense.component';

describe('ListesDepenseComponent', () => {
  let component: ListesDepenseComponent;
  let fixture: ComponentFixture<ListesDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesDepenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
