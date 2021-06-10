import { TestBed } from '@angular/core/testing';

import { TypesDepenseService } from './types-depense.service';

describe('TypesDepenseService', () => {
  let service: TypesDepenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesDepenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
