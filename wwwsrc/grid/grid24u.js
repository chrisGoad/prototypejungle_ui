
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
	let numRows = this.numRows= 200;
	let numCols = this.numCols = 200;
	this.width = 300;
	this.height = 300;
	this.deltaX = this.width/this.numCols;
	this.deltaY = this.height/this.numRows;
	debugger;
	//let convergenceValue = 0
	let rnp = {min:0,max:0,step:0}
	const walkParams = function (i,j) {
		let hw = 0.5 * numCols;
		let d = i-hw;
		let da = Math.abs(d);
		let inzone = d<0?da<10:da<5;
		//let inzone = (d0 < 10)|| (d1<10);
		if  (inzone) {
			debugger;
		}
		if (inzone) {
			rnp.step = 30;
			if (d>0) {
				rnp.step = 15;
				rnp.max = 100;
				rnp.min = 100;
			} else {
				rnp.max = 0;
				rnp.min = 0;
			}
		} else {
			rnp.step = 30;
			rnp.max = i>hw?100:250;
			rnp.min = 0;
		}
		return rnp;
	}
	this.setupShapeRandomizer('red', {step:15,min:0,max:250,constantFirstRoww:250,numRows,numCols,backwards:false,walkParams});
	

	this.shapeGenerator = function (shapes,rvs,cell) {
		let {rectP,deltaX,deltaY} = this;
		let shape = rectP.instantiate();
		shapes.push(shape);
		let fc = 1.1;
		let hw = 0.5*this.numCols;
		shape.width = fc*deltaX;
		shape.height = fc*deltaY;
		let r = Math.max(0,rvs.red);
		if (cell.x > hw) {
		  shape.fill = `rgb(0,${Math.floor(r)},${Math.floor(r)})`;
		} else {
		  shape.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		}
		shape.update();
		shape.show();
		return shape;
	}
		
		
		

 
this.initializeConstructor();
}
return rs;

});

