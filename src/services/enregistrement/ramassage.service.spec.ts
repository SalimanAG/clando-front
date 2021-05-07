import { TestBed } from '@angular/core/testing';

import { RamassageService } from './ramassage.service';

describe('RamassageService', () => {
  let service: RamassageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RamassageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
