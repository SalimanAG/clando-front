import { TestBed } from '@angular/core/testing';

import { CaissiereService } from './caissiere.service';

describe('CaissiereService', () => {
  let service: CaissiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaissiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
