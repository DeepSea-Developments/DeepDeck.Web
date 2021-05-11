import { TestBed } from '@angular/core/testing';

import { EventCollapseService } from './event-collapse.service';

describe('EventCollapseService', () => {
  let service: EventCollapseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventCollapseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
