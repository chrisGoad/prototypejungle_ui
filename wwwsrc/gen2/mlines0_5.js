
core.require('/line/line.js','/gen0/movingLines0.js',//'/random/addIntersectingLines4.js',
function (linePP,addMethods) {
debugger;
//let numTimeSteps = 100;
let rs = svg.Element.mk('<g/>');
rs.numTimeSteps = 100;
addMethods(rs);
/*adjustable parameters  */
rs.saveImage = true;
rs.setName('mlines0_5');
rs.width = 400;
rs.height = 200;
rs.numLines=2000;
//rs.numLines=5;
rs.angleMin = -90;
rs.angleMax = 90;
rs.velocityFactor = 0.1;
rs.rotationFactor = 0.02;
rs.rotationFactor = 0.004;
rs.uniformRotation = 0;
rs.moveTowardsCenter = 0;
rs.crossMode = 0;
rs.includeReverse = 1;
	rs.numFramesToRepeat = 20;
	rs.lineDirections = [0,0.5*Math.PI];
	rs.lineDirections = [0];
	rs.motionDirections = [0,0.5*Math.PI];
	rs.motionDirections = [0];
//rs.lineColor1 = 'cyan';
//rs.lineColor2 = 'yellow';
let yy = 200;
let zz = 50;
rs.startShapePairs = [[geom.LineSegment.mk(Point.mk(-yy,-yy),Point.mk(-yy,yy)),geom.LineSegment.mk(Point.mk(yy,-zz),Point.mk(yy,zz))]];
rs.endShapePairs = [[geom.LineSegment.mk(Point.mk(-yy,zz),Point.mk(-yy,-zz)),geom.LineSegment.mk(Point.mk(yy,yy),Point.mk(yy,-yy))]];
//rs.startShapePairs = [[geom.LineSegment.mk(Point.mk(-100,-100),Point.mk(-100,100)),geom.LineSegment.mk(Point.mk(100,-100),Point.mk(100,100))]];
//rs.shapePairs = originatingShapes;
//rs.endShapePairs = [[geom.LineSegment.mk(Point.mk(-100,100),Point.mk(0,100)),geom.LineSegment.mk(Point.mk(100,-100),Point.mk(0,100))]];
//rs.endShapePairs = [[geom.LineSegment.mk(Point.mk(100,100),Point.mk(100,-100)),geom.LineSegment.mk(Point.mk(-100,100),Point.mk(-100,-100))]];
//rs.endShapePairs = [[geom.LineSegment.mk(Point.mk(-100,100),Point.mk(-100,-100)),geom.LineSegment.mk(Point.mk(100,100),Point.mk(100,-100))]];

rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP.stroke =  'white';
  //this.lineP.stroke =  'blue';
  this.lineP['stroke-width'] = .045; 	
}  


rs.initialize = function () {
  this.initProtos();
  
  core.root.backgroundColor = 'black';
  this.initializeLines();
}	

return rs;
});
      

