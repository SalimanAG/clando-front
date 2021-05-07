import { TestBed } from '@angular/core/testing';

import { OperCaisseService } from './oper-caisse.service';

describe('OperCaisseService', () => {
  let service: OperCaisseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperCaisseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
