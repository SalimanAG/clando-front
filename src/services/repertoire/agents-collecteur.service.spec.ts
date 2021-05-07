import { TestBed } from '@angular/core/testing';

import { AgentsCollecteurService } from './agents-collecteur.service';

describe('AgentsCollecteurService', () => {
  let service: AgentsCollecteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentsCollecteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
