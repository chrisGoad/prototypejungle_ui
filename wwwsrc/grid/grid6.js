
core.require('/line/line.js','/grid/addGrid3.js',function (linePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke = 'yellow';
  this.blineP['stroke-width'] = .8;  
  core.assignPrototypes(this,'shapeP1',linePP);
  this.shapeP1.stroke = 'white';
  let vec = Point.mk((this.width/this.numRows)*0.15,0);
  this.shapeP1.setEnds(vec.minus(),vec);
  this.shapeP1['stroke-width'] = .4; 	
}  

item.initialize = function () {
  this.initializeProto();
  this.numRows= 41;
  this.numCols= 41;
  this.width = 200;
  this.height = 100;
  this.visChance= 1;
  this.pointJiggle = 0.5;
  this.includeShapes = true;
  core.root.backgroundColor = 'black';
  this.chanceAshapeIsVisible =0.05;
  this.fadeIn = true;
  this.lineShapeLength = 3;
  this.ywander = 6;
  this.randomizeWhichColors = 'boundaries';
   this.colorRangeL = [50,50,0];
  this.colorRangeH = [200,200,50]
  this.colorStep = [25,25,25];
  this.colorStep = [5,5,5];
  this.colorStart = [140,140,0];
  this.colorCombo = 'yellow';
  this.set('blines',core.ArrayNode.mk());
  this.initializeGrid();
}	
return item;
});
      

