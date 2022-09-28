import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrScannerRectsComponent } from './ocr-scanner-rects.component';

describe('OcrScannerRectsComponent', () => {
  let component: OcrScannerRectsComponent;
  let fixture: ComponentFixture<OcrScannerRectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcrScannerRectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcrScannerRectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
