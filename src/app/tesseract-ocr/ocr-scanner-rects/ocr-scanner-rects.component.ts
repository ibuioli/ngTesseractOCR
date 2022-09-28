import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TesseractService } from '../services/ng-tesseract/ng-tesseract.service';

@Component({
  selector: 'ocr-scanner-rects',
  templateUrl: './ocr-scanner-rects.component.html',
  styleUrls: ['./ocr-scanner-rects.component.scss']
})
export class OcrScannerRectsComponent implements OnInit, OnDestroy {

  @Input() image: string = '';
  @Input() lang: string = 'eng';  // eng for English, spa for Spanish
  @Input() width: number = 300;
  @Input() height: number = 300;
  @Input() rects: any = [];

  @Output() ocrText = new EventEmitter<any>();

  @ViewChild('ocr')
  private ocrCanvas: ElementRef = {} as ElementRef;

  imageWidth = 0;
  imageHeight = 0;

  canvas: any;
  ctx: any;
  imageObj: any;
  color = [
    '255,0,0',
    '0,0,255',
    '0,255,0',
    '255,0,255',
    '255,255,0',
    '0,255,255',
    '192,192,192',
    '128,0,0',
    '128,128,0',
    '0,128,0',
    '128,0,128',
    '0,128,128',
    '0,0,128',
    '128,128,128',
    '0,0,0'
  ];

  tesseract: any;
  ocrRect = {left: 0, top: 0, width: 0, height: 0};

  constructor() { }

  ngOnInit(): void {
    this.tesseract = new TesseractService();
  }

  ngAfterViewInit(): void {
    this.canvas = this.ocrCanvas.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    this.imageObj = new Image();
    this.imageObj.onload = () => {
      this.ctx.drawImage(this.imageObj, 0, 0, this.canvas.width, this.canvas.height);

      this.imageWidth = this.imageObj.width;
      this.imageHeight = this.imageObj.height;

      for (let i = 0; i < this.rects.length; i++) {
        this.ctx.fillStyle = 'rgba(' + this.color[i] + ', 0.4)';
        this.ctx.fillRect(
          this.rects[i].left * this.canvas.width / 100,
          this.rects[i].top * this.canvas.height / 100,
          this.rects[i].width * this.canvas.width / 100,
          this.rects[i].height * this.canvas.height / 100
        );

        this.rects[i].left = (this.rects[i].left * this.imageWidth) / 100;
        this.rects[i].top = (this.rects[i].top * this.imageHeight) / 100;
        this.rects[i].width = (this.rects[i].width * this.imageWidth) / 100;
        this.rects[i].height = (this.rects[i].height * this.imageHeight) / 100;
      }

      this.tesseract.imageRectsToText(this.image, this.lang, this.rects).subscribe((res: any) => {
        this.ocrText.emit(res);
      });
    };
    this.imageObj.src = this.image;
  }

  ngOnDestroy(): void {
    this.tesseract.terminateWorker();
  }



}
