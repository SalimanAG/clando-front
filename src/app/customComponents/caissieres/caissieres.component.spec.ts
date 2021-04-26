import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaissieresComponent } from './caissieres.component';

describe('CaissieresComponent', () => {
  let component: CaissieresComponent;
  let fixture: ComponentFixture<CaissieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaissieresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaissieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
