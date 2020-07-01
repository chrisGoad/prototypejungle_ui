// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
//core.require('/random/basicRL.js','/line/line.js','/grid/addGrid2.js',//'/grid/rwGrid2.js',
core.require('/line/line.js','/shape/circle.js','/random/addRandomLines3.js','/grid/addGrid2.js',//'/grid/rwGrid2.js',
 function (linePP,circlePP,addRandomLineMethods,addGridMethods) {
  debugger;
let item = svg.Element.mk('<g/>');


 //item.set('randomLines',randomLines.instantiate());
 //item.set('grid',grid.instantiate());


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


item.initialize = function () {
  debugger;
  let grid = this.set("grid",svg.Element.mk('<g/>'));
   let randomLines = this.set("randomLines",svg.Element.mk('<g/>'));
 this.initializeGridProto(grid);
 this.initializeRandomLineProtos(randomLines);
  addGridMethods(grid);
  addRandomLineMethods(randomLines);
 // th	is.randomLines.initialize();
  grid.numRows =32;
  grid.numCols = 22;
  grid.includeWindow = true;
  grid.theWindow.minx = 8;
  grid.theWindow.maxx = 13;
  grid.theWindow.miny = 8;
  grid.theWindow.maxy = 21;
  grid.circleCells.minx = 6;
  grid.circleCells.maxx = 15;
  grid.circleCells.miny = 8;
  grid.circleCells.maxy = 21;
   
  grid.windowCenterX = 10;
  grid.windowCenterY = 15;
  grid.visChance = 1;

  grid.initializeGrid();
  randomLines.set('lines1',core.ArrayNode.mk());
  randomLines.addTheLines();
  //randomLines.initialize();
  randomLines.setScale(0.27);
  //  this.addTheLines();

  //this.randomLines.moveto(Point.mk(0,-1.4));

  return;
  
}
 return item;
});
