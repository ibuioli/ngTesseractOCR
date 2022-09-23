# NgTesseractOCR

Module for integrate Tesseract OCR to Angular project with Components

## How use it like Module in a Project?

Install dependencies:

```
npm i tesseract.js
npm i --save-dev @types/node
```

Move tesseract-ocr folder to app folder in your Angular project. Import Tesseract Module in modules when need the Tesseract OCR Components:

```typescript
import { TesseractOcrModule } from './tesseract-ocr/tesseract-ocr.module';
```

Then set it:

```typescript
imports: [
    TesseractOcrModule
]
```
## Components
### Component Simple OCR Text

* image: string (Path to image)
* lang: string (Code for language, like eng or spa)

### Component Draw Rect over Image

* image: string (Path to image)
* lang: string (Code for language, like eng or spa)
* width: number
* height: number
* strokeStyle: string (Color for rect stroke)
