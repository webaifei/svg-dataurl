# svg-converter
Convert SVG to SVG/PNG/JPEG DataURL.

## Install

```console
$ npm install svg-converter
```

## Usage

```javascript
import {SvgConverter} from 'svg-converter'

const svg = documentGetElementById('chart')
const downloadLink = documentGetElementById('#download-link')
SvgConverter.loadFromElement(svg).then((converter) => {
  const dataUrl = converter.pngDataURL()
  downloadLink.setAttribute('href', dataUrl)
})
```
