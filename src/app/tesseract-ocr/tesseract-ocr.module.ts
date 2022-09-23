import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcrScannerComponent } from './ocr-scanner/ocr-scanner.component';
import { OcrScannerDrawComponent } from './ocr-scanner-draw/ocr-scanner-draw.component';

const COMPONENTS = [
  OcrScannerComponent,
  OcrScannerDrawComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    CommonModule
  ]
})
export class TesseractOcrModule { }
