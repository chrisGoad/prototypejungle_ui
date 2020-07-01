
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',
  '/grid/addGrid3.js','/grid/addQuadTree.js',
  function (linePP,circlePP,rectanglePP,addGridMethods,addQuadMethods) {
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
  grid.blineP.stroke = 'blue';
  grid.blineP['stroke-width'] = 0.1; 
  core.assignPrototypes(grid,'rlineP',linePP);
  grid.rlineP.stroke = 'yellow';
  grid.rlineP['stroke-width'] = 0.1;   
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
 
  let quad = this.set('quadtree',svg.Element.mk('<g/>'));
  let grid = this.set('grid',svg.Element.mk('<g/>'));
  addQuadMethods(quad);
  addGridMethods(grid);
  quad.width = 100;
  quad.height = 100;
  quad.maxDepth = 4;
  quad.fractionOfLinesVisible =.8;
  this.initializeProtos(quad);
 let nr = 64;
 // let nr = 6;
   this.initializeGridProtos(grid);
  grid.numRows= nr;
  grid.numCols= nr;
  grid.includeShapes = false;
  grid.includeCellBoundaries = true;
  grid.deltaX = 100/nr;
  grid.deltaY = 100/nr;
  grid.visChance= 1;
  grid.pathLength = 10;
  grid.generative = true;
  this.requireFullLength = false;
  grid.fractionToOccupy = 0.9;
  //core.root.backgroundColor = 'black';
  grid.initializeGrid();
}	
return item;
});
      

