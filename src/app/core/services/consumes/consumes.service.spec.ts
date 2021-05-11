import { TestBed } from '@angular/core/testing';

import { ConsumesService } from './consumes.service';

describe('ConsumesService', () => {
  let service: ConsumesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
