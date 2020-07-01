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
  outer.blineP['stroke-width'] = 0.9;  
  core.assignPrototypes(outer,'shapeP1',linePP);
  outer.shapeP1.stroke = 'black';
  let vec = Point.mk((outer.width/outer.numRows)*0.3,0);
  outer.shapeP1.setEnds(vec.minus(),vec);
  outer.shapeP1['stroke-width'] = .8; 
  core.assignPrototypes(outer,'replacementShapeP',circlePP);
  outer.replacementShapeP.fill = 'red';
  outer.replacementShapeP.dimension = (outer.width/outer.numRows)*0.2;
  outer.replacementShapeP['stroke-width'] = 0; 	
	
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
  core.root.backgroundColor = 'rgb(30,30, 200)';
  let outer = this.set("outer",svg.Element.mk('<g/>'));
   let inner = this.set("inner",svg.Element.mk('<g/>'));
 
  
  addGridMethods(inner);
  addGridMethods(outer);
   outer.numRows =22;
   outer.numCols =22;
   outer.numRows = 31;
   outer.numCols = 31;
  outer.width = 200* (31/22);
  outer.height = 100*(31/22);
  
  this.initializeOuterProtos();
  this.initializeInnerProtos();
 // th	is.randomLines.initialize();
 
  outer.includeWindow = false;
  outer.theWindow.minx = 9;
  outer.theWindow.maxx = 12;
  outer.theWindow.miny = 6;
  outer.theWindow.maxy = 15;
  //outer.theWindow.miny = 8;
 // outer.theWindow.maxy = 13;
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
  outer.pointJiggle = 2;
  outer.randomizeWhichColors = 'boundaries';
  outer.chanceAshapeIsVisible =0.5;
  outer.bendCircleRadius = 130* (31/22);
  outer.bendCircleRadius = 120* (31/22);
  outer.bendCircleY = 180* (31/22); 
  outer.randomColorBias = 20;
  let circleBox1 = outer.set('circleBox1',core.ObjectNode.mk());
  let circleBox2 = outer.set('circleBox2',core.ObjectNode.mk());
  let mvx = 4;
  let mvy = 3;
  circleBox1.minx = 5+mvx;
  circleBox1.maxx = 7+mvx;
  circleBox1.miny = 8+mvy;
  circleBox1.maxy = 14+mvy;
  circleBox2.minx = 14+mvx;
  circleBox2.maxx = 16+mvx;
  circleBox2.miny = 8+mvy;
  circleBox2.maxy = 14+mvy;
  outer.replacementFunction = function (grid,i,j) {
    return grid.inBox(circleBox1,i,j,true) || grid.inBox(circleBox2,i,j,true);
  }
  outer.initializeGrid();
  return;
   inner.numRows= 20;
  inner.numCols= 20;
  inner.width = 100;
  inner.height = 30;
  
  this.initializeInnerProtos();
  inner.chanceShapeIsVisible = 1;
  inner.pointJiggle = 0;
  inner.shapeOp = function (shp) {
    console.log('shapeOp');
    inner.directLineRandomly(shp,.5);
  }
  inner.includeShapes = true;
  inner.includeCellBoundaries = false;
  inner.randomizeWhichLineColors = 'niether';
  inner.chanceShape2IsVisible = 0.15;
  
  debugger;
  inner.initializeGrid();
  //randomLines.initialize();
  inner.moveto(Point.mk(0,-20));
  inner.setScale(0.47);
  //  this.addTheLines();

  

  return;
  
}
 return item;
});
