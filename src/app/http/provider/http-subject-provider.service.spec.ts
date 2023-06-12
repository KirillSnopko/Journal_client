import { TestBed } from '@angular/core/testing';

import { HttpSubjectProviderService } from './http-subject-provider.service';

describe('HttpSubjectProviderService', () => {
  let service: HttpSubjectProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpSubjectProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
