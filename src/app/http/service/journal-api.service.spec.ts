import { TestBed } from '@angular/core/testing';

import { JournalApiService } from './journal-api.service';

describe('JournalApiService', () => {
  let service: JournalApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
