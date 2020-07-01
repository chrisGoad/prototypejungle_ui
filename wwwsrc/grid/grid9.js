// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
//core.require('/random/basicRL.js','/line/line.js','/grid/addGrid2.js',//'/grid/rwGrid2.js',
core.require('/line/line.js','/shape/circle.js','/grid/addGrid3.js',//'/grid/rwGrid2.js',
 function (linePP,circlePP,addGridMethods) {
  debugger;
let item = svg.Element.mk('<g/>');


 //item.set('randomLines',randomLines.instantiate());
 //item.set('grid',grid.instantiate());


	
item.initializeProtos = function () {
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
  debugger;
  core.root.backgroundColor = 'rgb(23, 21, 99)';
  
 
  
  addGridMethods(this);
   
 // outer.numCols = 4;
  
 // th	is.randomLines.initialize();
 
   this.numRows= 20;
  this.numCols= 20;
  this.width = 100;
  this.height = 100;
  this.initializeProtos();
  this.chanceShapeIsVisible = 1;
  this.pointJiggle = 0;
  
  this.shapeOp = function (shp) {
    console.log('shapeOp');
    this.directLineRandomly(shp,.5);
  }
  this.includeShapes = true;
  this.includeCellBoundaries = false;
  this.randomizeWhichLineColors = 'niether';
  this.chanceShape2IsVisible = 0.15;
  debugger;
  this.initializeGrid();
  //randomLines.initialize();
  //  this.addTheLines();

  
}

 
 return item;
});
