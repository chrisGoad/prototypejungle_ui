
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
	debugger;
	this.initializeP();
	core.root.backgroundColor = 'black';
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
	let numCols = this.numCols = 100;
	this.width = 300;
	this.height = 300;
	this.deltaX = this.width/this.numCols;
	this.deltaY = this.height/this.numRows;
	let rnp = {};
	const walkParamsR = function (i,j) {
		let fri = i/numRows;
		let mfri = 1 - fri;
		rnp . max = 250 * mfri;
		rnp . min = 100 * mfri;
		rnp . step = 20;
		return rnp;
	}
	const walkParamsG = function (i,j) {
		let fri = i/numRows;
		let mfri = 1 - fri;
		rnp . max = 250 * fri;
		rnp . min = 100 * fri;
		rnp . step = 20;
		return rnp;
	}
	const walkParamsB = function (i,j) {
		let frj = j/numRows;
		let mfrj = 1 - frj;
		rnp . max = 250 * frj;
		rnp . min = 100 * frj;
		rnp . step = 20;
		return rnp;
	}		
	//this.setupShapeRandomizer('red', {step:35,min:40,max:250,constantFirstRoww:250,numRows,numCols,backwards:false});
	this.setupShapeRandomizer('red', {walkParams:walkParamsR,numRows,numCols});
	this.setupShapeRandomizer('green', {walkParams:walkParamsG,numRows,numCols});
	this.setupShapeRandomizer('blue', {walkParams:walkParamsB,numRows,numCols});

	
	
	this.shapeGenerator = function (shapes,rvs) {
		debugger;
		let {rectP,deltaX,deltaY} = this;
		let shape = rectP.instantiate();
		shapes.push(shape);
		let fc = 1.1;
		shape.width = fc*deltaX;
		shape.height = fc*deltaY;
		let r = rvs.red;
		let g = rvs.green;
		let  b = rvs.blue;
		let ir = Math.floor(r/50)*50;
		shape.fill = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
		shape.update();
		shape.show();
		return shape;
	}
		
		
		

 
this.initializeConstructor();
}
return rs;

});

