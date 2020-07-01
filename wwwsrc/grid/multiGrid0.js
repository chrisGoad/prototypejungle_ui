// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/random/addRandomLines3.js','/grid/addMultiSizeGrid.js',
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/grid/addGrid3.js','/grid/addMultiSizeGrid.js',
 function (squareP,linePP,circlePP,addGridMethods,addMultiGridMethods) {
  debugger;
let item = svg.Element.mk('<g/>');


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

item.initializeRandomLineProtos = function (lines) {
  core.assignPrototypes(lines,'lineP',linePP);
  lines.lineP.stroke = 'red';
  lines.lineP['stroke-width'] = 0.5;
  core.assignPrototypes(lines,'circleP',circlePP);
  lines.circleP.stroke = 'red';
  lines.circleP['stroke-width'] = 0.5;
}  


 item.set('square',squareP.instantiate());
 //item.set('inner',inner.instantiate());
// item.set('grid',grid.instantiate());

item.initialize = function () {
  debugger;
 // th	is.inner.initialize();
  let inner = item.set('inner',svg.Element.mk('<g/>'));

  let grid = this.set('grid',svg.Element.mk('<g/>'));
  addMultiGridMethods(grid);
  addGridMethods(inner);
  inner.numRows= 20;
  inner.numCols= 20;
  inner.width = 100;
  inner.height = 100;
  this.initializeInnerProtos(inner);
  this.grid.width = 60;
  this.grid.height = 60;
  this.grid.initializeGrid([20,10,9,30]);
  //   this.grid.initializeGrid([20,10,40,30]);

  this.square.fill = 'blue';
 this.square.width = 30;
 this.square.height = 30;
 this.square.stroke = 'transparent';
  
  this.square.update();
  this.square.show();
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
//  inner.lineShapeLength = 10;
  debugger;
  inner.shapeGenerationFunction = function (grid,shapes,idx) {
    let rs;
    if (Math.random() < 0.8) {
      rs = grid.shapeP1.instantiate();
      shapes.set(idx,rs);
      grid.directLineRandomly(rs,.5);
    } else {
      rs = grid.shapeP2.instantiate();
      shapes.set(idx,rs);
    }
    rs.update();
    rs.show();
    return rs;
  }
  inner.initializeGrid();
  //inner.set('lines1',core.ArrayNode.mk());
  //inner.initializeGrid();
  inner.setScale(0.27);
  //this.inner.moveto(Point.mk(0,-1.4));


}
 return item;
});
