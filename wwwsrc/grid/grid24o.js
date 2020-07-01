
core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (linePP,constructor,addRandomMethods) {
  debugger;
  let rs = constructor();
  
rs.initializeP = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255)';
	this.lineP['stroke-width'] = 1;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 1;
}  
rs.rgb2color = function (r,g,b) {
	return `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
}
rs.initialize = function () {
	this.initializeP();

	this.numRows= 20;
	this.numCols = 20;
	this.width = 300;
	this.height = 300;
	let deltaX = this.deltaX = this.numCols/this.width;
	let deltaY = this.deltaY = this.numRows/this.height;
	let fc = 5;
	
	//this.visChance= 1;
	this.pointJiggle = 3;
	this.includeShapes = true;
	//this.includeCellBoundaries = 1;
 /*
	this.boundaryStrokeWidth =1;
	this.shapeStroke = 'white';
	this.shapeStrokeWidth = 0.2;
	this.shapeLengthRatio = 0.6;
	this.redP = {step:35,min:10,max:250};
	this.greenP = {step:35,min:20,max:250};
	this.blueP = {step:35,min:20,max:250};
*/
	let rm = this.randomizer = {};
	addRandomMethods(rm);
	let rnds = this.randomGridsForBoundaries = {};
//	let  rParams = {step:5,min:5,max:10,numRows:this.numRows,numCols:this.numCols};

	let  cParams = {step:80,min:50,max:250,numRows:this.numRows+1,numCols:this.numCols+1};
	rnds.red  = rm.genRandomGrid(cParams);
 
 
this.shapeGenerator = function (shapes,rvs,cell) {
	debugger;
	let deltaX = this.deltaX;
	let line0 = this.lineP.instantiate();
	shapes.push(line0);
	let dir;
	let {x,y} = cell;
	if ((x%2 === 0) && (x === y)) {
		dir = 0.25* Math.PI;
	} else {
	  dir = 2*Math.PI * Math.random();
	}
	let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(0.3*deltaX);
	let end0 = vec0.minus();
	let end1 = vec0;
	line0.setEnds(end0,end1);
	line0.update();
	
	return line0;
	}

this.boundaryLineGenerator = function (lines,end0,end1,rvs,cell) {
	debugger;
	let line = this.boundaryLineP.instantiate();
	lines.push(line);
	line.setEnds(end0,end1);
	let r = rvs.red;
	line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
	line.update();
	line.show();
}
	

	 
	

this.initializeConstructor();
}
return rs;

});

