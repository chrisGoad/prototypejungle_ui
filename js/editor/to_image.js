
/* from
 * https://stackoverflow.com/questions/27230293/how-to-convert-svg-to-png-using-html5-canvas-javascript-jquery-and-save-on-serve
 */
let shrinkFactor = 1;
let jpegPadFactor = 1.2;
let jpgSizeFactor = 4;// 2

const drawInlineSVG = function (svgElement, bbox,xPad,yPad,ctx, callback) {
  debugger;
  var svgURL = new XMLSerializer().serializeToString(svgElement);
  var img  = new Image();
  img.onload = function(){
    let xcenter = bbox.x + bbox.width/2;
    let lowx = xcenter - xPad*bbox.width/2;
    let ycenter = bbox.y + bbox.height/2;
    let lowy = ycenter - yPad*bbox.height/2;   
    ctx.drawImage(this, lowx,lowy,xPad*bbox.width,yPad*bbox.height,0,0,jpgSizeFactor*xPad*bbox.width,jpgSizeFactor*yPad*bbox.height);
    callback();
  }
  img.src = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
  }

//usage :
//drawInlineSVG(document.querySelector('svg'), ctxt, function(){console.log(canvas.toDataURL())})

// in movie mode (vars.jpegMovieMode === true), each image is collected into the array jpegMovie, rather than being written to a file.

let jpegMovieMode = false;


let jpegMovie = [];


const convertToJpeg = function (destPath,cb) {
  let canvas = document.getElementById('imageCanvas');
  let svgElement = dom.svgMain.__element
  let bbox = svgElement.getBBox();
  let f = jpegPadFactor;
  let maxXpad = svgwd/bbox.width;
  let xPad = Math.min(f,maxXpad);
  let maxYpad = svght/bbox.height;
  let yPad = Math.min(f,maxYpad);
  canvas.width = jpgSizeFactor* xPad*bbox.width;
  canvas.height = jpgSizeFactor * yPad*bbox.height;
  let ctxt = canvas.getContext('2d');
  const harvestImage = function () {
    let base64 = canvas.toDataURL('image/jpeg');
    saveBase64Image(destPath,base64,cb);
  } 
  drawInlineSVG(svgElement,bbox,xPad,yPad, ctxt, harvestImage)

}

// from https://stackoverflow.com/questions/13198131/how-to-save-an-html5-canvas-as-an-image-on-a-server
const saveBase64Image = function (destPath,dataURL,cb) {
  let binary = atob(dataURL.split(',')[1]);
  // Create 8-bit unsigned array
  let arr = [];
  let ln = binary.length;
  for (let i =0; i < binary.length; i++) {
    arr.push(binary.charCodeAt(i));
  }
  let str = new Uint8Array(arr);
  if (jpegMovieMode) {
    jpegMovie.push(str);
    if (cb) {
      cb();
    }
  } else {
    fb.saveString(destPath,str,fb.jpegMetadata,undefined,cb);
  }
}



const imageToDataUrl = function (image) {
  debugger;
  let canvas = document.getElementById('imageCanvas');
  let element = image.__element;
  element.crossOrigin = "Anonymous";
  let bbox = element.getBBox();
  canvas.width = jpgSizeFactor * (bbox.width);
  canvas.height = jpgSizeFactor * (bbox.height);
  let ctxt = canvas.getContext('2d');
  ctxt.drawImage(element,bbox.x,bbox.y,bbox.width,bbox.height,0,0,jpgSizeFactor * bbox.width,jpgSizeFactor * bbox.height);
  let base64 = canvas.toDataURL('image/jpeg');
  image.href  = base64;
  return base64;
}

export {jpegMovieMode,jpegMovie,convertToJpeg,imageToDataUrl};
