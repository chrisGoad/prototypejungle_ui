
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/line/line.js','/grid/addBrokenGrid.js','/grid/dim2dWalker.js',function (linePP,addMethods,addRandomizer) {
debugger;
let variant;
variant = 'a'; //white
//variant = 'b'; //red and green
//variant = 'c'; //all colors

let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'red';
  this.lineP['stroke-width'] = .2;  
  core.assignPrototypes(this,'shapeP1',linePP);
}  

item.initialize = function () {
  core.root.backgroundColor ='black';
  this.initializeProto();
  let numLines = this.numLines = 600;
  this.numRows= this.numLines;
  this.numCols= this.numLines;
  this.width = 200;
  this.height = 200;
  
  let sc = this.randomizer = {};
  addRandomizer(sc);
  this.thereR = sc.genRandomGrid(numLines,numLines,5,3,35);
  this.missingR = sc.genRandomGrid(numLines,numLines,8,3,35);
  this.redR = sc.genRandomGrid(numLines,numLines,25,100,250);
  this.greenR = sc.genRandomGrid(numLines,numLines,25,100,250);
  this.blueR = sc.genRandomGrid(numLines,numLines,25,100,250);
  switch (variant) {
    case 'a':this.rgb2color = (r,g,b) => `rgb(${r},${r},${r})`;break;
    case 'b':this.rgb2color = (r,g,b) => `rgb(${r},${g},0)`;break;
    case 'c':this.rgb2color = (r,g,b) => `rgb(${r},${g},${b})`;break;
  }
 
  let hwd = 0.5*this.width;
  let hht = 0.5*this.height;
  let quad1 = [Point.mk(-hwd,hht),Point.mk(hwd,hht),Point.mk(-hwd,-hht),Point.mk(hwd,-hht)];
  let quad2 = [quad1[0],quad1[2],quad1[1],quad1[3]];
  debugger;
  let lines =  this.set('lines',core.ArrayNode.mk());
  let {lineP,numRows,numCols} = this;
  let params = {lineP,lines,quadrangle:quad1,numLines,vertical:true};
  this.addQuadLines(params);
  params.quadrangle = quad2;
  params.vertical = false;
  this.addQuadLines(params);
}	
return item;
});
      

