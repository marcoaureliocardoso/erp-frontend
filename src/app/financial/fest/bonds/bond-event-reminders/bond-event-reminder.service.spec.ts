import { TestBed } from '@angular/core/testing';

import { BondEventReminderService } from './bond-event-reminder.service';

describe('EventService', () => {
  let service: BondEventReminderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BondEventReminderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
