import { TestBed, inject } from '@angular/core/testing';

import { DepotService } from './depot.service';

describe('DepotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepotService]
    });
  });

  it('should be created', inject([DepotService], (service: DepotService) => {
    expect(service).toBeTruthy();
  }));
});
