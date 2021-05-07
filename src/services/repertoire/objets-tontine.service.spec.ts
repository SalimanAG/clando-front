import { TestBed } from '@angular/core/testing';

import { ObjetsTontineService } from './objets-tontine.service';

describe('ObjetsTontineService', () => {
  let service: ObjetsTontineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetsTontineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
