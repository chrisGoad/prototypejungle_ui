
core.require('/line/line.js','/shape/circle.js','/grid/addGrid3.js',function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */

	
item.initializeProto = function () {
  //core.assignPrototypes(this,'blineP',linePP);
  //this.blineP.stroke = 'yellow';
  //this.blineP['stroke-width'] = 0.2;  
  core.assignPrototypes(this,'shapeP1',linePP);
  this.shapeP1.stroke = 'red';
  let vec = Point.mk((this.width/this.numRows)*0.4,0);
  this.shapeP1.setEnds(vec.minus(),vec);
  this.shapeP1['stroke-width'] = .5;
  core.assignPrototypes(this,'shapeP2',circlePP);
  this.shapeP2.stroke = 'red';
  this.shapeP2.dimension = (this.width/this.numRows)*0.8;
  this.shapeP2['stroke-width'] = .5; 	
}   	




item.initialize = function () {
  this.numRows= 20;
  this.numCols= 20;
  this.width = 100;
  this.height = 100;
  this.initializeProto();
  this.chanceShapeIsVisible = 1;
  this.pointJiggle = 0.5;
  this.shapeOp = function (shp) {
    debugger;
    console.log('shapeOp');
    this.directLineRandomly(shp,.5);
  }
  this.includeShapes = true;
  this.includeCellBoundaries = false;
  this.randomizeWhichLineColors = 'niether';
  this.chanceShape2IsVisible = 0.15;
  //core.root.backgroundColor = 'black';
  this.initializeGrid();
}	
return item;
});
      

