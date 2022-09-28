import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcrScannerComponent } from './ocr-scanner/ocr-scanner.component';
import { OcrScannerDrawComponent } from './ocr-scanner-draw/ocr-scanner-draw.component';
import { OcrScannerRectsComponent } from './ocr-scanner-rects/ocr-scanner-rects.component';

const COMPONENTS = [
  OcrScannerComponent,
  OcrScannerDrawComponent,
  OcrScannerRectsComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    CommonModule
  ]
})
export class TesseractOcrModule { }
