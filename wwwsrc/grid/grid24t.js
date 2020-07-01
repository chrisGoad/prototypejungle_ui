
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
	let numRows = this.numRows= 100;
	let numCols = this.numCols = 100;
	this.width = 300;
	this.height = 300;
	this.deltaX = this.width/this.numCols;
	this.deltaY = this.height/this.numRows;
	debugger;
	//let convergenceValue = 0;
	let convergenceFactorL = function(i,j)  {
		let hw = 0.5 * numCols;
		let d = i-hw;
		let da = Math.abs(d);
		//let d0 = Math.abs(i-j);
		//let d1 = Math.abs(numCols - (i+j));
		let inzone = (da < 15);
		//let inzone = (d0 < 10)|| (d1<10);
		if  (inzone) {
			debugger;
		}
		return (inzone)?((d>0)?.2:.5):0;
	}
	let convergenceValuee = function (i,j) {
		let hw = 0.5 * numCols;
		let d = i - hw;
		if (d > 0) {
			return 125;
		} else {
			return 0;
		}
	}
	let convergenceValue = function (i,j) {
		let center = Point.mk(0.5*numCols,0.5*numRows);
		//let d = Math.abs(i-hw);
		let hw = 0.5 * numCols;
		let dx = i-hw;
		let d = Point.mk(i,j).distance(center);
		if (d > 30) {
			return 125;
		} else {
			return 0;
		}
	}
	
		
	let convergenceFactorrr = function(i,j)  {
		let hw = 0.5 * numCols;
		let d0 = Math.abs(i-hw);
		let d1 = Math.abs(j-hw);
		let inzone = (d0 < 10)|| (d1<10);
		if  (inzone) {
			debugger;
		}
		return (inzone)?0.5:0;
	}
	let convergenceFactor = function(i,j)  {
		let center = Point.mk(0.5*numCols,0.5*numRows);
		//let d = Math.abs(i-hw);
		let hw = 0.5 * numCols;
		let dx = i-hw;
		let d = Point.mk(i,j).distance(center);
		let inzone = (d < 40);
		if  (inzone) {
			debugger;
		}
		return (inzone)?((dx>0)?.05:.5):0;

		return (inzone)?0.5:0;
	}
	
	this.setupShapeRandomizer('red', {step:15,min:0,max:250,constantFirstRoww:250,numRows,numCols,backwards:false,convergenceFactor,convergenceValue});
	

	this.shapeGenerator = function (shapes,rvs) {
		let {rectP,deltaX,deltaY} = this;
		let shape = rectP.instantiate();
		shapes.push(shape);
		let fc = 1.1;
		shape.width = fc*deltaX;
		shape.height = fc*deltaY;
		let r = Math.max(0,rvs.red);
		shape.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		shape.update();
		shape.show();
		return shape;
	}
		
		
		

 
this.initializeConstructor();
}
return rs;

});

