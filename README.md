# svg2dataurl
Convert SVG to SVG/PNG/JPEG DataURL. Just forked from [likr/svg-dataurl](https://github.com/likr/svg-dataurl) and then do some modifications.
1. Instead of commonsjs  module ,use es6 module.
2. Fix some issues.

## Install

```console
$ npm install svg2dataurl
```

## Usage

```javascript
import {SvgConverter} from 'svg2dataurl'

const svg = documentGetElementById('chart')
const downloadLink = documentGetElementById('#download-link')
SvgConverter.loadFromElement(svg).then((converter) => {
  const dataUrl = converter.pngDataURL()
  downloadLink.setAttribute('href', dataUrl)
})
```
