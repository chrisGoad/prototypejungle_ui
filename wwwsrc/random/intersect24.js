
core.require('/line/line.js','/shape/circle.js','/random/addLinesShapes0.js','/grid/dim2dWalker2.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,addMethods,addRandomMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = .035; 	
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'black';
  this.circleP.fill = 'rgba(0,0,0,.5)';
  this.circleP['stroke-width'] = 0;
  this.circleP.dimension = 2;
}  


item.initialize = function () {
  this.initializeProto();
  this.width = 400;
  this.height = 200;
  this.numLines=3000;
  //this.numLines=5;
  this.angleMin = -90;
  this.angleMax = 90;
  this.rDivisions = 10;
  //this.angleMin = 
 // this.angleMax = 10;
  //this.numLines=200;
 // core.root.backgroundColor = 'black';
  let rm = this.randomizer = {};
  addRandomMethods(rm);
  this.rDivisions = 40;
 // let  rParams = {step:0.1,min:0,max:1,numRows:this.rDivisions,numCols:this.rDivisions};
  let  rParams = {step:30,min:0,max:255,numRows:this.rDivisions,numCols:this.rDivisions};
  this.grayLevel  = rm.genRandomGrid(rParams);
  this.shapePairs = [[geom.LineSegment.mk(Point.mk(-50,-30),Point.mk(-50,30)),geom.LineSegment.mk(Point.mk(50,-30),Point.mk(50,30))]];
  this.initializeLines();
}	
return item;
});
      

