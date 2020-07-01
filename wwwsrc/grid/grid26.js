
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/line/line.js','/grid/addArcGrid.js','/grid/addShades.js',
 function (linePP,addMethods,addShadeMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
addShadeMethods(item);
/*adjustable parameters  */

item.shade2rgb = function (ic) {
  let [r,g,b] = ic;
  let c = [r,r,0]; //////yellow
  //let c = [r,g,b]; 
  //let c = [r,r,r]; 
  return `rgb(${Math.floor(c[0])},${Math.floor(c[1])},${Math.floor(c[2])}`;
}

item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .4;  
  core.assignPrototypes(this,'shapeP1',linePP);
}  

item.initialize = function () {
  core.root.backgroundColor ='black';
  this.initializeProto();
  this.numLines = 100;
  this.numRows= 100;
  this.numCols= 100;
  this.width = 200;
  this.height = 200;
  this.maxThere = 5;
  this.minThere = 0;
  this.maxMissing = 3;
  this.minMissing = 0;
 // this.maxThere = 25;
 // this.minThere = 25;
 // this.maxMissing = 3;
  //this.minMissing = 0;
  this.pixelDim = 5;
  this.rangeL = [100,100,100];
  this.rangeH = [250,250,250];
  this.maxStep = [25,25,25];
  this.set('shades',core.ArrayNode.mk());
   this.colorRangeL = [50,50,0];
  this.colorRangeH = [200,200,50]
  this.colorStep = [25,25,25];
  this.colorStep = [5,5,5];
  this.colorStart = [140,140,0];
  this.colorCombo = 'yellow';
  let hwd = 0.5*this.width;
  let hht = 0.5*this.height;
  let quad1 = [Point.mk(-hwd,hht),Point.mk(hwd,hht),Point.mk(-hwd,-hht),Point.mk(hwd,-hht)];
  let quad2 = [quad1[0],quad1[2],quad1[1],quad1[3]];

  debugger;
  let lines =  this.set('lines',core.ArrayNode.mk());
  this.genShades();
  this.addQuadLines(this.lineP,lines,quad1,this.numLines,this.maxThere,this.minThere,this.maxMissing,this.minMissing)
  this.addQuadLines(this.lineP,lines,quad2,this.numLines,this.maxThere,this.minThere,this.maxMissing,this.minMissing)
}	
return item;
});
      

