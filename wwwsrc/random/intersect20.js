
core.require('/line/line.js','/shape/circle.js','/random/addLinesShapes0.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .0015; 	
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'black';
  this.circleP.fill = 'rgba(0,0,0,.5)';
  this.circleP['stroke-width'] = 0;
  this.circleP.dimension = 2;
}  


item.initialize = function () {
  core.root.backgroundColor = 'black';
  this.initializeProto();
  this.width = 200;
  this.height = 200;
  this.numLines=3000;
  //this.numLines=5;
  this.angleMin = -90;
  this.angleMax = 90;
  //this.angleMin = -10;
 // this.angleMax = 10;
  //this.numLines=200;
 // core.root.backgroundColor = 'black';
 this.shapePairs = [[geom.Circle.mk(Point.mk(0,50),3),geom.Circle.mk(Point.mk(0,-50),50)],
  [geom.Circle.mk(Point.mk(10,50),3),geom.Circle.mk(Point.mk(10,-50),50)]];
 //  [geom.Circle.mk(Point.mk(0,-50),10),geom.Circle.mk(Point.mk(0,50),30)]];
 //this.originatingShapes = [geom.Circle.mk(Point.mk(-100,-200),45),geom.Circle.mk(Point.mk(100,-200),45)];

  this.initializeLines();
}	
return item;
});
      

