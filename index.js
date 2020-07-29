const btoa = window.btoa

const toDataURL = (svgText) => {
  return 'data:image/svg+xml;charset=utf-8;base64,' + btoa(encodeURIComponent(svgText).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)))
}
const isSupportOuterHtml = typeof document !== "undefined" && !("outerHTML" in document.createElementNS("http://www.w3.org/1999/xhtml", "_"));

const initCanvas = (svgDataURL, width, height) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const image = new Image()
    canvas.width = width
    canvas.height = height
    image.onload = () => {
      context.drawImage(image, 0, 0)
      resolve(canvas)
    }
    image.src = svgDataURL
  })
}

const privates = new WeakMap()

const getSVGDataURL = (self) => {
  return privates.get(self).svgDataURL
}

const getCanvas = (self) => {
  return privates.get(self).canvas
}

export default class SVGConverter {
  static load (svgText, width, height) {
    const dataURL = toDataURL(svgText)
    return initCanvas(dataURL, width, height).then((canvas) => {
      return new SVGConverter(dataURL, canvas)
    })
  }

  static loadFromElement (original) {
    const {width, height} = original.getBoundingClientRect()
    const svg = original.cloneNode(true)
    svg.setAttributeNS(null, 'version', '1.1')
    svg.setAttributeNS(null, 'width', width)
    svg.setAttributeNS(null, 'height', height)
    svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg')
    svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
    const outerHtml = this.getOuterHTML(svg);
    return SVGConverter.load(outerHtml, width, height)
  }

  constructor (svgDataURL, canvas) {
    privates.set(this, {
      svgDataURL,
      canvas
    })
  }
  static getOuterHTML(node) {
    function getOuterHTMLPollyfill(node) {
      const container = document.createElementNS("http://www.w3.org/1999/xhtml", "_");
      container.appendChild(node.cloneNode(false));
      const html = container.innerHTML.replace("><", ">" + node.innerHTML + "<");
      container = null;
      return html;
    }
    return isSupportOuterHtml ? node.outerHTML : getOuterHTMLPollyfill(node);
  }
  svgDataURL () {
    return getSVGDataURL(this)
  }

  pngDataURL () {
    return getCanvas(this).toDataURL('image/png')
  }

  jpegDataURL () {
    return getCanvas(this).toDataURL('image/jpeg')
  }
}


