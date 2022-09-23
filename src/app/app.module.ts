import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TesseractOcrModule } from './tesseract-ocr/tesseract-ocr.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TesseractOcrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
