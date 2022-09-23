import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrScannerComponent } from './ocr-scanner.component';

describe('OcrScannerComponent', () => {
  let component: OcrScannerComponent;
  let fixture: ComponentFixture<OcrScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcrScannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcrScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
