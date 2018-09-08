import { TestBed, inject } from '@angular/core/testing';

import { LitterItemsService } from './litter-items.service';

describe('LitterItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LitterItemsService]
    });
  });

  it('should be created', inject([LitterItemsService], (service: LitterItemsService) => {
    expect(service).toBeTruthy();
  }));
});
