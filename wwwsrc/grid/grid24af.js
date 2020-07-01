
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

rs.positionFunction = function (grid,i,j) {
	 let {deltaX,deltaY,numRows,numCols,width,height} = grid;
  //let xdim = numCols * deltaX;
  //let ydim = numRows * deltaY;
	let hwy = numRows/2;
	let bothalf = j<hwy;
  let botx = -0.5 * width;
  let boty = -0.5 * height;
  return Point.mk((bothalf?0*deltaX:0)+botx + deltaX*i,boty + deltaY*j);
  
}


rs.initialize = function () {
	debugger;
	core.root.backgroundColor = 'red';
	this.initializeP();

	let numRows = this.numRows= 40;
	let numCols = this.numCols = 40;
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
	let {deltaX,numCols} = this;
	let hw = numCols/2;
	let onLeft = cell.x<hw;
	let onTop = cell.y<hw;
	let line0 = this.lineP.instantiate();
	shapes.push(line0);
	let dir;
	let {x,y} = cell;
	let alongCross = true;
	let  includeCross = false;
	//onLeft = false;
	let llnf = 0.2;
	if (onLeft === onTop) {
		llnf = 0.3;
	}
	if ((x%1 === 0) && (x === y)  && includeCross) {
		dir = (alongCross)?0.25* Math.PI:.75* Math.PI;
		line0.stroke = 'rgba(100,100,255,1)';
	} else if  ((x%1 === 0) && (x + y === (this.numRows-1)) && includeCross){
		dir = (alongCross)?0.75*Math.PI:0.25*Math.PI;
		line0.stroke = 'rgba(100,100,255,1)';
	   //line0.stroke = 'rgba(200,50,50,1)';
	} else if (onTop) {
		dir = (Math.random() < 0.001?(0.25*Math.PI):0) + 0.5*Math.PI * Math.floor(Math.random()*4);
	} else if (onLeft) {
	  dir = 0.25*Math.PI * Math.floor(Math.random()*4);
	} else {
	  dir = 2*Math.PI * Math.random();
	}

	let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(llnf*deltaX);
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

