
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',
  '/grid/addGrid3.js',
  function (linePP,circlePP,rectanglePP,addGridMethods) {
debugger;
let item = svg.Element.mk('<g/>');



item.initializeProtos = function () {
  core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke = 'blue';
  this.blineP['stroke-width'] = 0.1; 
  core.assignPrototypes(this,'rlineP',linePP);
  this.rlineP.stroke = 'yellow';
  this.rlineP['stroke-width'] = 0.1;   
  core.assignPrototypes(this,'shapeP1',circlePP);
  this.shapeP1.fill = 'red';
  this.shapeP1.dimension = (this.width/this.numRows)*0.3;
  this.shapeP1['stroke-width'] = 0.05; 	
}  

item.initialize = function () {
  debugger;
  //this.initializeProtos();
  //let c = this.set('c',this.circleP.instantiate());
  //c.dimension = 20;
 // c.update();
  //this.c.show();
  //this.initializeProto();
  core.root.backgroundColor = 'black';
 
 
  addGridMethods(this);
   this.initializeProtos();
   let nr = 32;
  this.numRows= nr;
  this.numCols= nr;
  this.width = 100;
  this.height = 100;
  this.includeShapes = false;
  this.includeCellBoundaries = true;
  this.visChance= 1;
  this.pathLength = 10;
  this.generative = true;
  this.requireFullLength = false;
  this.fractionToOccupy = 0.9;
  //core.root.backgroundColor = 'black';
  this.initializeGrid();
}	
return item;
});
      

