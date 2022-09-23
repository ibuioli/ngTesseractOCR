import { TestBed } from '@angular/core/testing';

import { TesseractService } from './ng-tesseract.service';

describe('TesseractService', () => {
  let service: TesseractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesseractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
