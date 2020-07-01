
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
	let rnp = {correlated:true};
	const walkParams = function (i,j) {
		let fri = i/numRows;
		let frj = j/numCols;
		
		if ((frj>0.4) && (frj<.6) && (fri>.45) && (fri<0.5)) {
			debugger;
			rnp.stepx = 30;
			rnp.stepy = 50;
			rnp.max=0;
			rnp.min=0;
		} else if ((fri > 0.5) && (frj>0.4) && (frj<.6)) {
			rnp.stepx = 5;
			rnp.stepy = 30;
		} else {
			rnp.stepx = 15;
			rnp.stepy = 30;
			rnp.min = 50;
			rnp.max = 250;
		}
		return rnp;
	}
			
	//this.setupShapeRandomizer('red', {step:35,min:40,max:250,constantFirstRoww:250,numRows,numCols,backwards:false});
	this.setupShapeRandomizer('red', {walkParams,numRows,numCols});

	
	
	this.shapeGenerator = function (shapes,rvs) {
		debugger;
		let {rectP,deltaX,deltaY} = this;
		let shape = rectP.instantiate();
		shapes.push(shape);
		let fc = 1.1;
		shape.width = fc*deltaX;
		shape.height = fc*deltaY;
		let r = rvs.red;
		let ir = Math.floor(r/50)*50;
		shape.fill = `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
		shape.update();
		shape.show();
		return shape;
	}
		
		
		

 
this.initializeConstructor();
}
return rs;

});

