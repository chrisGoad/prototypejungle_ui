
core.require('/line/line.js','/shape/rectangle.js','/gen0/lines0.js','/gen0/grid0.js','/gen0/basics.js',
function (linePP,rectanglePP,addLinesMethods,addGridMethods,addBasicMethods) {
debugger;
let item = svg.Element.mk('<g/>');
addBasicMethods(item);
item.setName('hybrid00_0');
/*adjustable parameters  */






/*adjustable parameters  */


const initializeGridProtos = function (grid) {
  core.assignPrototypes(grid,'blineP',linePP);
  grid.blineP.stroke = 'white';
  grid.blineP['stroke-width'] = .04;  
  core.assignPrototypes(grid,'lineP',linePP);
  grid.lineP.stroke = 'white';
  grid.lineP['stroke-width'] = 1;;  
   core.assignPrototypes(grid,'rlineP',linePP);
  grid.rlineP.stroke = 'red';
  grid.rlineP.stroke = 'white';
  grid.rlineP.stroke = 'white';
  grid.rlineP['stroke-width'] = 0.5;
    core.assignPrototypes(grid,'rectangleP',rectanglePP);
  grid.rectangleP.stroke = 'transparent';
  grid.rectangleP.stroke = 'white';
  grid.rectangleP.fill = 'black';
  grid.rectangleP['stroke-width'] = 0.5;
  
}  

const initializeLinesProtos = function (lines) {
  core.assignPrototypes(lines,'lineP',linePP);
  lines.lineP.stroke = 'cyan';
  lines.lineP['stroke-width'] = .075; 	
 /* core.assignPrototypes(lines,'circleP',circlePP);
  lines.circleP.fill = 'black';
  lines.circleP.fill = 'rgba(0,0,0,.5)';
  lines.circleP['stroke-width'] = 0;
  lines.circleP.dimension = 2;*/
}  

item.backgroundColor = 'black';

item.initialize = function () {
  let RA = geom.Ray.mk(Point.mk(0,0),Point.mk(1,1));
 // let RB = geom.Ray.mk(Point.mk(0,1),Point.mk(1,-0.5));
  let RB = geom.Ray.mk(Point.mk(0,1),Point.mk(1,0));
  let RC = RA.intersectRay(RB);
  //core.root.backgroundColor = 'black';
  let lines = this.set('lines',svg.Element.mk('<g/>'));
  addLinesMethods(lines);
 let grid = this.set('grid',svg.Element.mk('<g/>'));
  addGridMethods(grid);
	lines.backgroundColor = 'black';
  initializeLinesProtos(lines);
  initializeGridProtos(grid);
  lines.width = 400;
  lines.width = 400;
  lines.height = 200;
  lines.numLines=3000;
  //lines.numLines=5;
  lines.angleMin = -90;
  lines.angleMax = 90;
  //lines.angleMin = -10;
 // lines.angleMax = 10;
  //lines.numLines=200;
 // core.root.backgroundColor = 'black';
 
 lines.originatingShapes = [geom.Circle.mk(Point.mk(-100,-200),100),geom.Circle.mk(Point.mk(100,-200),100)];

  lines.initializeLines();
//  return;
  let rect = grid.set('rectangle',grid.rectangleP.instantiate());

  let fac  = 3;
  let base =20;
  grid.numRows= 50;
  grid.numRows= 50;
  grid.numRows= base;
  grid.numCols = base * fac;
 // grid.numCols = 100;
 // grid.numCols = 50;
 // grid.numRows= 2;
//  grid.numCols= 4;
  grid.width = 600;
  grid.width = 100;
  let fc = 0.5;
  grid.width = 200*fc;
  grid.height = 100*fc;
  rect.width = grid.width+20;
  rect.height = grid.height+20;
  rect.moveto(Point.mk(0,5));
  rect.update();
  rect.show();
  //return item;
  grid.deltaX = grid.numCols/grid.width;
  grid.deltaY = grid.numRows/grid.height;
  grid.visChance= 1;
  grid.pointJiggle = 0.5;
  grid.includeShapes = false;
  grid.includeCellBoundaries = 0;
  grid.chanceAshapeIsVisible =0.05;
  grid.fadeIn = false;
  grid.lineShapeLength = undefined;
  grid.ywander = 0;
  grid.randomizeWhichColors = 'boundaries';
  grid.randomizeWhichColors = 'neither';
 // grid.randomizeWhichColors = 'both';
  grid.pointJiggle = 0;
  grid.includeLetters = 1;
  grid.letterWidth = 4;
  grid.letterWidth = 3;
  grid.letterHeight = 3;
  grid.fractionInked = 0.4;
  grid.lettersPerWord = 5;
   
  grid.initializeGrid();
}	
return item;
});
      

