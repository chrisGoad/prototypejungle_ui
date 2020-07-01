
core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (linePP,constructor,addRandomMethods) {
  debugger;
  let rs = constructor();
  
rs.initializeP = function () {
	core.assignPrototypes(this,'lineP',linePP);
	core.root.backgroundColor ='black';
	this.lineP.stroke = 'rgb(255,255,255)';
	this.lineP['stroke-width'] = 1;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 1;
}  

rs.initialize = function () {
	this.initializeP();

	let numRows = this.numRows= 20;
	let numCols = this.numCols = 20;
	this.width = 300;
	this.height = 300;
	let deltaX = this.deltaX = this.numCols/this.width;
	let deltaY = this.deltaY = this.numRows/this.height;
	let fc = 5;
	this.pointJiggle = 3;
	this.includeShapes = true;
  this.setupBoundaryRandomizer('red', {step:80,min:50,max:250,numRows,numCols});
 
this.shapeGenerator = function (shapes,rvs,cell) {
	debugger;
	let deltaX = this.deltaX;
	let line0 = this.lineP.instantiate();
	shapes.push(line0);
	let dir;
	let {x,y} = cell;
	if ((x%1 === 0) && (x === y)) {
		dir = 0.25* Math.PI;
		//dir = 0.15* Math.PI;
	} else if  ((x%1 === 0) && (x + y === (this.numRows-1))){
		dir = 0.75*Math.PI;
		//dir = 0.65*Math.PI;
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

this.boundaryLineGeneratorr = function (lines,end0,end1,rvs,cell) {
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

