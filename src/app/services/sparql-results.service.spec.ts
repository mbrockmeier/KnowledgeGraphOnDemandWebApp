import { TestBed } from '@angular/core/testing';

import { SparqlResultsService } from './sparql-results.service';

describe('SparqlResultsService', () => {
  let service: SparqlResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SparqlResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
