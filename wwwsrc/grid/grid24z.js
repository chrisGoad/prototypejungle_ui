
core.require('/shape/circle.js','/shape/rectangle.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (circlePP,rectPP,constructor,addRandomMethods) {
  debugger;
  let rs = constructor();
  
rs.initializeP = function () {
	core.assignPrototypes(this,'circleP',circlePP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.circleP.fill = 'white';
	this.circleP['stroke-width'] = 0;
	this.circleP.dimension = 3;
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP.fill = 'white';
	this.rectP['stroke-width'] = 0;
	this.rectP.width = 1;
	this.rectP.height = 4;
}  


rs.initialize = function () {
	this.initializeP();
	if (0) {
		let endA0 = Point.mk(-500,-500);
		let endA1 = Point.mk(500,-500);
		let arcA = geom.Arc.mk(endA0,endA1,600);
		let endB0 = Point.mk(-300,500);
		let endB1 = Point.mk(600,500);
		this.sideA = (fr) => arcA.pointOn(fr);
		//this.sideA = (fr) => this.linearInterpolator(endA0,endA1,fr);
		this.sideB = (fr) => this.linearInterpolator(endB0,endB1,fr);
		this.positionFunction = this.sidesPositionFunction;
	}
	let numRows = this.numRows= 50;
	let numCols = this.numCols = 50;
	this.width = 200;
	this.height = 200;
	this.deltaX = this.width/this.numCols;
	this.deltaY = this.height/this.numRows;
	debugger;
	//let convergenceValue = 0
	let rnp = {min:0,max:0,step:0}
	const walkParams = function (i,j) {
	//	debugger;
		let t0 = 0.1*numCols;
		let t1 = 0.5*numCols;
		let t2 = 0.9*numCols;
		let step = 0.3;
		let max,min;
	  if (i < t0) {
			min = 0;
			max = i/t0;
			max = 0;
		} else if (i < t2) {
			min = 0;
			max = 1;
		} else {
			min  = (i-t2)/(1-t2);
			min  = 1;
			max = 1;
		}
		rnp.min = min;
		rnp.max = max;
 		rnp.step = step;
		return rnp;
	}

		
		
this.setupShapeRandomizer('v', {numRows,numCols,walkParams});
this.setupShapeRandomizer('red', {numRows,numCols,step:30,min:100,max:200});

	debugger;

	this.shapeGenerator = function (shapes,rvs,cell) {
	
		let {rectP,deltaX,deltaY} = this;
		let v = rvs.v;
		let shape  = svg.Element.mk('<g/>');
		let inner = this.rectP.instantiate();
		shape.set('i',inner);
		let r = rvs.red;
		if (v<0.5) {
			inner.width = 4;
			inner.height = 3;
			inner.fill = 'rgb(100,50,50)';
			inner.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		} else {
			inner.width = 3;
			inner.height = 4;
			inner.fill = 'rgb(50,50,100)';
			inner.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		}
		shapes.push(shape);
		inner.update();
		inner.show();
		//shape.fill = `rgb(0,${Math.floor(r)},${Math.floor(g)})`;//${Math.floor(r)})`;
	//	inner.fill = `rgb(0,${Math.floor(r)},${Math.floor(r)})`;
		//inner.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		//shape.fill = `rgb(${Math.floor(g)},${Math.floor(g)},${Math.floor(g)})`;
		
		//shape.update();
		shape.show();
		debugger;
		return shape;
	}
		
		
		

 
this.initializeConstructor();
}
return rs;

});

