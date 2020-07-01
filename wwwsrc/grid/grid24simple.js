
core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (linePP,constructor,addRandomMethods) {
  debugger;
  let rs = constructor();
  
rs.initializeP = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255,1)';
	this.lineP['stroke-width'] = 0;
	this.lineP['stroke-width'] = 1;
	this.lineP.dimension = 4;
}  


rs.initialize = function () {
	debugger;
	//this.initializeP();
  let endA0 = Point.mk(-50,-50);
  let endA1 = Point.mk(50,-50);
	let arcA = geom.Arc.mk(endA0,endA1,60);
  let endB0 = Point.mk(-30,50);
  let endB1 = Point.mk(60,50);
	this.sideA = (fr) => arcA.pointOn(fr);
	//this.sideA = (fr) => this.linearInterpolator(endA0,endA1,fr);
	this.sideB = (fr) => this.linearInterpolator(endB0,endB1,fr);
	this.positionFunction = this.sidesPositionFunction;
	this.numRows= 20;
	this.numCols = 20;
	this.width = 300;
	this.height = 300;
	
	this.includeShapes = false;
	this.includeCellBoundaries = 1;
  this.boundaryStroke = 'white';
	this.boundaryStrokeWidth =1;
	

 
this.initializeConstructor();
}
return rs;

});

