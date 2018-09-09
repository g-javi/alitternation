import { TestBed, inject } from '@angular/core/testing';

import { BinService } from './bin.service';

describe('BinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BinService]
    });
  });

  it('should be created', inject([BinService], (service: BinService) => {
    expect(service).toBeTruthy();
  }));
});
