import { TestBed } from '@angular/core/testing';

import { GrantorService } from './grantor.service';

describe('GrantorService', () => {
  let service: GrantorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrantorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
