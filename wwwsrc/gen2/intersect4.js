
core.require('/line/line.js','/shape/circle.js','/gen0/lines0.js',//'/random/addIntersectingLines4.js',

function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = .025; 	
   core.assignPrototypes(this,'circleP',circlePP);
  this.lineP.stroke = 'black';
  //this.lineP['stroke-width'] = 1; 	
}  


item.initialize = function () {
  this.initializeProto();
  this.dimension = 300;
  this.numLines=5000;
  //this.numLines=110;
  this.angleMin = -90;
  this.angleMax = 90;
  //this.angleMin = -10;
 // this.angleMax = 10;
  //this.numLines=200;
 // core.root.backgroundColor = 'black';
 let circle =  this.set('visCircle',this.circleP.instantiate());
 circle.dimension = this.dimension;
 circle.update();
 circle.show();
 this.lineCenterDistance = 10;
  this.shapePairs = [[geom.Circle.mk(Point.mk(0,0),40),null]];
  //geom.LineSegment.mk(Point.mk(-50,-80),Point.mk(-50,80)),geom.LineSegment.mk(Point.mk(-50,-80),Point.mk(50,-80))]];

 this.originatingShapess = [geom.Circle.mk(Point.mk(0,0),40)];
 
  this.initializeLines();
}	
return item;
});
      

