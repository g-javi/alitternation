import { TestBed, inject } from '@angular/core/testing';

import { ImageRecognitionService } from './image-recognition.service';

describe('ImageRecognitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageRecognitionService]
    });
  });

  it('should be created', inject([ImageRecognitionService], (service: ImageRecognitionService) => {
    expect(service).toBeTruthy();
  }));
});
