
//core.require('/shape/rectangle.js','/grid/addShades.js',function (rectPP,addMethods) {
//core.require('/shape/circle.js','/grid/addShades.js',function (pixelPP,addMethods) {
core.require('/shape/rectangle.js','/grid/addShades.js',function (pixelPP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */
/*

item.shade2rgb = function (ic,combo) {
  let [r,g,b] = ic;
  let c;
  if (combo === 'none') {
    c = [r,g,b];
  } else if (combo === 'white') {
     c = [r,r,r];
  } else if (combo === 'yellow') {
    c = [r,r,0];
  } else if (combo === 'magenta') {
    c = [r,0,r];
  } else if (combo === 'cyan') {
    c = [0,g,g];
  }
  return `rgb(${Math.floor(c[0])},${Math.floor(c[1])},${Math.floor(c[2])}`;
}
*/

item.setPixelDim = function (px,dim) {
  //px.dimension = dim-1;
  px.width = dim+1;
  px.height = dim+1;
}
  
item.shade2rgb = function (ic) {
  let [r,g,b] = ic;
  //let c = [r,r,0]; //yellow
  let c = [r,g,b]; //yellow
 // let c = [r,r,r]; //white
  return `rgb(${Math.floor(c[0])},${Math.floor(c[1])},${Math.floor(c[2])}`;
}
item.initializeProto = function () {
  core.assignPrototypes(this,'pixelP',pixelPP);
  this.pixelP.stroke = 'transparent';
  this.pixelP['stroke-width']= 0;
}
  

item.initialize = function () {	
  core.root.backgroundColor = 'rgb(0,0,0)';
  this.initializeProto();
  //this.combo = 'white';
  this.combo = 'yellow';
 // this.combo = 'magenta';
 // this.combo = 'cyan';
  //this.combo = 'none';
 // this.widthInPixels = 200;
  this.numCols = 200;
 // this.numCols = 50;
 // this.heightInPixels = 200;
  this.numRows = 200;
 // this.numRows = 50;
  this.pixelDim = 5;
  //this.rangeL = [40,40,40];
  this.rangeL = [60,60,60];
  this.rangeH = [250,250,250];
  this.maxStep = [25,25,25];
  this.set('pixels',core.ArrayNode.mk());
  this.set('shades',core.ArrayNode.mk());
  debugger;
  this.genShades();
  
}	
return item;
});
      

