import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createWorker } from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class TesseractService {

  worker: any;

  constructor() {
    this.worker = createWorker();
  }

  public imageToText(img: string, lang: string): any {
    const ocr$ = new Observable(observer => {
      (async () => {
        await this.worker.load();
        await this.worker.loadLanguage(lang);
        await this.worker.initialize(lang);
        const { data: { text } } = await this.worker.recognize(img);
        observer.next(text);
        observer.complete();
      })();
    });

    return ocr$;
  }

  public imageRectToText(img: string, lang: string, rectangle: any): any {
    const ocr$ = new Observable(observer => {
      (async () => {
        await this.worker.load();
        await this.worker.loadLanguage(lang);
        await this.worker.initialize(lang);
        const { data: { text } } = await this.worker.recognize(img, { rectangle });
        observer.next(text);
        observer.complete();
      })();
    });

    return ocr$;
  }

  public imageRectsToText(img: string, lang: string, rectangles: any): any {
    const ocr$ = new Observable(observer => {
      (async () => {
        await this.worker.load();
        await this.worker.loadLanguage(lang);
        await this.worker.initialize(lang);
        const values = [];
        for (let i = 0; i < rectangles.length; i++) {
          const { data: { text } } = await this.worker.recognize(img, { rectangle: rectangles[i] });
          values.push(text);
        }
        observer.next(values);
        observer.complete();
      })();
    });

    return ocr$;
  }

  public terminateWorker(): void {
    this.worker.terminate();
  }
}
