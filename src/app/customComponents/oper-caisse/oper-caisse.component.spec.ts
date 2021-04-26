import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperCaisseComponent } from './oper-caisse.component';

describe('OperCaisseComponent', () => {
  let component: OperCaisseComponent;
  let fixture: ComponentFixture<OperCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperCaisseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
