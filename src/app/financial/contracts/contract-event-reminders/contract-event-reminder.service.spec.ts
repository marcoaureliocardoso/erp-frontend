import { TestBed } from '@angular/core/testing';

import { ContractEventReminderService } from './contract-event-reminder.service';

describe('EventService', () => {
  let service: ContractEventReminderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractEventReminderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
