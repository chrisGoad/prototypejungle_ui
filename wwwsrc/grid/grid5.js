// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
//core.require('/random/basicRL.js','/line/line.js','/grid/addGrid2.js',//'/grid/rwGrid2.js',
core.require('/line/line.js','/shape/circle.js','/grid/addGrid3.js',//'/grid/rwGrid2.js',
 function (linePP,circlePP,addGridMethods) {
  debugger;
let item = svg.Element.mk('<g/>');


 //item.set('randomLines',randomLines.instantiate());
 //item.set('grid',grid.instantiate());


	
item.initializeInnerProtos = function () {
  //core.assignPrototypes(this,'blineP',linePP);
  //this.blineP.stroke = 'yellow';
  //this.blineP['stroke-width'] = 0.2;  
  let inner = this.inner;
  core.assignPrototypes(inner,'shapeP1',linePP);
  inner.shapeP1.stroke = 'red';
  let vec = Point.mk((inner.width/inner.numRows)*0.4,0);
  inner.shapeP1.setEnds(vec.minus(),vec);
  inner.shapeP1['stroke-width'] = .5;
  core.assignPrototypes(inner,'shapeP2',circlePP);
  inner.shapeP2.stroke = 'red';
  inner.shapeP2.dimension = (inner.width/inner.numRows)*0.8;
  inner.shapeP2['stroke-width'] = .5; 	
}   	


item.initializeOuterProtos	 = function () {
  let outer = this.outer;
  core.assignPrototypes(outer,'blineP',linePP);
  outer.blineP.stroke = 'yellow';
  outer.blineP['stroke-width'] = 0.6;  
  core.assignPrototypes(outer,'shapeP1',linePP);
  outer.shapeP1.stroke = 'white';
  let vec = Point.mk((outer.width/outer.numRows)*0.15,0);
  outer.shapeP1.setEnds(vec.minus(),vec);
  outer.shapeP1['stroke-width'] = .2; 	
}  

/*
item.initializeRandomLineProtos = function (lines) {
  core.assignPrototypes(lines,'lineP',linePP);
  lines.lineP.stroke = 'red';
  lines.lineP['stroke-width'] = 0.5;
  core.assignPrototypes(lines,'circleP',circlePP);
  lines.circleP.stroke = 'red';
  lines.circleP['stroke-width'] = 0.5;
}  

item.initializeGridProto= function (grid) {
  debugger;
  core.assignPrototypes(grid,'shapeP',linePP);
  let shapeP = grid.shapeP;
  shapeP['stroke-width'] = 0.1
  shapeP.stroke = 'black';
  shapeP.setEnds(Point.mk(-1,0),Point.mk(1,0));
  
}
*/

item.initialize = function () {
  debugger;
  core.root.backgroundColor = 'rgb(23, 21, 99)';
  let outer = this.set("outer",svg.Element.mk('<g/>'));
   let inner = this.set("inner",svg.Element.mk('<g/>'));
 
  
  addGridMethods(inner);
  addGridMethods(outer);
   outer.numRows =32;
   outer.numCols =22;
  // outer.numRows = 5;
 // outer.numCols = 4;
  outer.width = 200;
  outer.height = 100;
  this.initializeOuterProtos();
  this.initializeInnerProtos();
 // th	is.randomLines.initialize();
 
  outer.includeWindow = true;
  outer.theWindow.minx = 8;
  outer.theWindow.maxx = 13;
  outer.theWindow.miny = 6;
  outer.theWindow.maxy = 16;
  outer.theWindow.miny = 8;
  outer.theWindow.maxy = 23;
  /* outer.theWindow.minx = 1;
  outer.theWindow.maxx = 2;
  outer.theWindow.miny = 1;
  outer.theWindow.maxy = 2;*/
  outer.includeShapes = true;
 /* grid.circleCells.minx = 6;
  grid.circleCells.maxx = 15;
  grid.circleCells.miny = 8;
  grid.circleCells.maxy = 21;
   
  grid.windowCenterX = 10;
  grid.windowCenterY = 15;*/
  outer.visChance = 1;
  outer.pointJiggle = 1;
  outer.randomizeWhichColors = 'boundaries';
  outer.chanceAshapeIsVisible =0.2;
   outer.colorRangeL = [50,50,0];
  outer.colorRangeH = [200,200,50]
  outer.colorStep = [25,25,25];
  outer.colorStep = [5,5,5];
  outer.colorStart = [140,140,0];
  outer.colorCombo = 'yellow';
  outer.initializeGrid();
   inner.numRows= 20;
  inner.numCols= 20;
  inner.width = 100;
  inner.height = 100;
  this.initializeInnerProtos();
  inner.chanceShapeIsVisible = 1;
  inner.pointJiggle = 0;
  inner.shapeGenerationFunction = function (grid,shapes,idx) {
    let rs = grid.shapeP1.instantiate();
    shapes.set(idx,rs);
    grid.directLineRandomly(rs,.5);
    rs.update();
    rs.show();
    return rs;
  }
  inner.includeShapes = true;
  inner.includeCellBoundaries = false;
  inner.randomizeWhichColors = 'niether';
  inner.chanceShape2IsVisible = 0.15;
  debugger;
  inner.initializeGrid();
  //randomLines.initialize();
  inner.setScale(0.47);
  //  this.addTheLines();

  

  return;
  
}
 return item;
});
