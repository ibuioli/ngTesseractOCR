import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrScannerDrawComponent } from './ocr-scanner-draw.component';

describe('OcrScannerDrawComponent', () => {
  let component: OcrScannerDrawComponent;
  let fixture: ComponentFixture<OcrScannerDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcrScannerDrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcrScannerDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
