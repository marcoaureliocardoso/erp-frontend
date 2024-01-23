import { TestBed } from '@angular/core/testing';

import { ContractEventService } from './contract-event.service';

describe('EventService', () => {
  let service: ContractEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
