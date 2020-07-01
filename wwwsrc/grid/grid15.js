
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/line/line.js','/grid/addArcGrid.js',function (linePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


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
  this.addQuadLines(this.lineP,lines,quad1,this.numLines,this.maxThere,this.minThere,this.maxMissing,this.minMissing)
  this.addQuadLines(this.lineP,lines,quad2,this.numLines,this.maxThere,this.minThere,this.maxMissing,this.minMissing)
}	
return item;
});
      

