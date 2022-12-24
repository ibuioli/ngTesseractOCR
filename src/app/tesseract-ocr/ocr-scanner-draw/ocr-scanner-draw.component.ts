import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { TesseractService } from '../services/ng-tesseract/ng-tesseract.service';

@Component({
  selector: 'ocr-scanner-draw',
  templateUrl: './ocr-scanner-draw.component.html',
  styleUrls: ['./ocr-scanner-draw.component.scss']
})
export class OcrScannerDrawComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() image: string = '';
  @Input() lang: string = 'eng';  // eng for English, spa for Spanish
  @Input() width: number = 300;
  @Input() height: number = 300;

  @Output() ocrText = new EventEmitter<any>();

  @ViewChild('ocr')
  private ocrCanvas: ElementRef = {} as ElementRef;

  canvas: any;
  ctx: any;
  imageObj: any;
  strokeStyle = 'red';
  rect: any = {startX: 0, startY: 0, w: 0, h: 0};
  drag = false;

  tesseract: any;
  ocrRect = {left: 0, top: 0, width: 0, height: 0};

  constructor(private render: Renderer2) { }

  ngOnInit(): void {
    this.tesseract = new TesseractService();
  }

  ngAfterViewInit(): void {
    this.canvas = this.ocrCanvas.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    this.imageObj = new Image();
    this.imageObj.onload = () => {
      this.ctx.drawImage(this.imageObj, 0, 0, this.canvas.width, this.canvas.height);
    };
    this.imageObj.src = this.image;

    this.render.listen(this.canvas, 'mousedown', (event: any) => {
      this.mouseDown(event);
    });
    this.render.listen(this.canvas, 'mouseup', (event: any) => {
      this.mouseUp(event);
    });
    this.render.listen(this.canvas, 'mousemove', (event: any) => {
      this.mouseMove(event);
    });
  }

  ngOnDestroy(): void {
    this.tesseract.terminateWorker();
  }

  mouseDown(e: any): void {
    this.rect.startX = e.pageX - this.canvas.offsetLeft;
    this.rect.startY = e.pageY - this.canvas.offsetTop;
    this.drag = true;
  }

  mouseUp(e: any): void {
    this.drag = false

    let tx = ~~((this.imageObj.width * this.rect.startX) / this.canvas.width);
    let ty = ~~((this.imageObj.height * this.rect.startY) / this.canvas.height);
    let tw = ~~((this.imageObj.width * this.rect.w) / this.canvas.width);
    let th = ~~((this.imageObj.height * this.rect.h) / this.canvas.height);

    if (tw < 0) {
      tx = tx + tw;
      tw = tw * -1;
    }

    if (th < 0) {
      ty = ty + th;
      th = th * -1;
    }

    this.ocrRect = {left: tx, top: ty, width: tw, height: th};
    console.log(this.ocrRect);

    this.tesseract.imageRectToText(this.image, this.lang, this.ocrRect).subscribe((res: any) => {
      this.ocrText.emit(res);
    });

    this.ctx.clearRect(0, 0, 500, 500);
    this.ctx.drawImage(this.imageObj, 0, 0, this.canvas.width, this.canvas.height);
  }

  mouseMove(e: any): void {
    if (this.drag) {
      this.ctx.clearRect(0, 0, 500, 500);
      this.ctx.drawImage(this.imageObj, 0, 0, this.canvas.width, this.canvas.height);
      this.rect.w = (e.pageX - this.canvas.offsetLeft) - this.rect.startX;
      this.rect.h = (e.pageY - this.canvas.offsetTop) - this.rect.startY;
      this.ctx.strokeStyle = this.strokeStyle;
      this.ctx.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
    }
  }

}
