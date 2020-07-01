
//core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',
 // '/grid/addGrid3.js','/grid/addQuadTree.js',
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',
  '/grid/addGrid3.js',
  function (linePP,circlePP,rectanglePP,addGridMethods) {
debugger;
let item = svg.Element.mk('<g/>');

/*adjustable parameters  */
item.initializeProtos = function (itm) {
  core.assignPrototypes(itm,'lineP',linePP);
  itm.lineP.stroke = 'yellow';
  itm.lineP['stroke-width'] = .2; 
  core.assignPrototypes(itm,'circleP',circlePP);
  itm.circleP.fill = 'rgba(255,0,0,0.8)';
  itm.circleP.dimension = 10;
  itm.circleP['stroke-width'] = 0.05; 

  core.assignPrototypes(itm,'rectangleP',rectanglePP);
  itm.rectangleP.fill = 'black';
  itm.rectangleP.stroke = 'transparent';
  itm.rectangleP.width = item.deltaX*0.5;
  itm.rectangleP.height = item.deltaX*0.05;
}  



item.initializeGridProtos = function (grid) {
  core.assignPrototypes(grid,'blineP',linePP);
  grid.blineP.stroke = 'rgb(130, 130, 206)';//'blue';
  grid.blineP['stroke-width'] = 0.1; 
  core.assignPrototypes(grid,'rlineP',linePP);
  grid.rlineP.stroke = 'yellow';
  grid.rlineP['stroke-width'] = 0.2;   
  core.assignPrototypes(grid,'shapeP1',circlePP);
  grid.shapeP1.fill = 'red';
  grid.shapeP1.dimension = (grid.width/grid.numRows)*0.3;
  grid.shapeP1['stroke-width'] = 0.05; 	
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
 
  //let quad = this.set('quadtree',svg.Element.mk('<g/>'));
  let grid = this.set('grid',svg.Element.mk('<g/>'));
  //addQuadMethods(quad);
  addGridMethods(grid);
  /*quad.width = 100;
  quad.height = 100;
  quad.maxDepth = 4;
  quad.fractionOfLinesVisible =.8;
  this.initializeProtos(quad);
  */
 let nr = 64;
 // let nr = 6;
  grid.numRows= nr;
  grid.numCols= nr;
  grid.width = 100;
  grid.height = 100;
  this.initializeGridProtos(grid);

  grid.includeShapes = false;
  grid.includeCellBoundaries = true;
  //grid.deltaX = 100/nr;
  //grid.deltaY = 100/nr;
  grid.visChance= 1;
  grid.pathLength = 10;
  grid.generative = true;
  grid.fadeIn = false;
 // this.requireFullLength = false;
  grid.fractionToOccupy = 0.9;
  grid.randomizeWhichColors = 'regions';
  grid.boundaryLineFraction = 1;
  //grid.bendCircleRadius = 100;
  //grid.bendCircleY = 180; 
  grid.includeShapes = false;
  grid.randomizeWhichColors = 'regions';
   grid.colorRangeL = [50,50,0];
  grid.colorRangeH = [200,200,50]
  grid.colorStep = [15,15,15];
  grid.colorStart = [140,140,0];
  grid.colorCombo = 'yellow';
  //core.root.backgroundColor = 'black';
  debugger;
  grid.initializeGrid();
}	
return item;
});
      

