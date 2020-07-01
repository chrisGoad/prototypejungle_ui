
core.require('/shape/rectangle.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (rectPP,constructor,addRandomMethods) {
  debugger;
  let rs = constructor();
  
rs.initializeP = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP['stroke-width'] = 0;
	this.rectP.dimension = 4;
}  


rs.initialize = function () {
	this.initializeP();
	if (0) {
		let endA0 = Point.mk(-50,-50);
		let endA1 = Point.mk(50,-50);
		let arcA = geom.Arc.mk(endA0,endA1,60);
		let endB0 = Point.mk(-30,50);
		let endB1 = Point.mk(60,50);
		this.sideA = (fr) => arcA.pointOn(fr);
		//this.sideA = (fr) => this.linearInterpolator(endA0,endA1,fr);
		this.sideB = (fr) => this.linearInterpolator(endB0,endB1,fr);
		this.positionFunction = this.sidesPositionFunction;
	}
	let numRows = this.numRows= 100;
	let numCols = this.numCols = 200;
	this.width = 200;
	this.height = 100;
	this.deltaX = this.width/this.numCols;
	this.deltaY = this.height/this.numRows;
	debugger;
	//let convergenceValue = 0
	let rnp = {min:0,max:0,step:0}
	const walkParams = function (i,j,w) {
		debugger;
		let ffr = i/numCols;
		let bfr = 1-ffr;
		let fr = w?bfr:ffr;
		
		let stepFactor = 80;
		let maxFactor = 250;
		if (0 && (i<2)) {
		  rnp.min = 100;
			rnp.max = 100;
		} else {
			rnp.min = 0;
			rnp.max = fr * maxFactor;
		}
 		rnp.step = fr *stepFactor;
		return rnp;
	}
	const walkParamsRed = function (i,j) {
		return walkParams(i,j,0);
	}
	const walkParamsGreen = function (i,j) {
		return walkParams(i,j,1);
	}
		
		
	this.setupShapeRandomizer('red', {numRows,numCols,walkParams:walkParamsRed});
	this.setupShapeRandomizer('green', {numRows,numCols,walkParams:walkParamsGreen});
	

	this.shapeGenerator = function (shapes,rvs,cell) {
		if ((cell.x == 50) && (cell.y = 50)) {
			debugger;
		}
		let {rectP,deltaX,deltaY} = this;
		let shape = rectP.instantiate();
		shapes.push(shape);
		let fc = 1.1;
		let hw = 0.5*this.numCols;
		shape.width = fc*deltaX;
		shape.height = fc*deltaY;
		let r = Math.max(0,rvs.red);
		let g = Math.max(0,rvs.green);
		shape.fill = `rgb(0,${Math.floor(r)},${Math.floor(g)})`;//${Math.floor(r)})`;
		//shape.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		//shape.fill = `rgb(${Math.floor(g)},${Math.floor(g)},${Math.floor(g)})`;
		
		shape.update();
		shape.show();
		return shape;
	}
		
		
		

 
this.initializeConstructor();
}
return rs;

});

