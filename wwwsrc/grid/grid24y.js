
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
	let numRows = this.numRows= 100;
	let numCols = this.numCols = 100;
	this.width = 400;
	this.height = 400;
	this.deltaX = this.width/this.numCols;
	this.deltaY = this.height/this.numRows;
	debugger;
	//let convergenceValue = 0
	let rnp = {min:0,max:0,step:0}
	const walkParams = function (i,j,which) {
		debugger;
		let iorj = which?i:j;
		let hw = 0.5*numCols;
		//let ffr = (i>hw)?2*(i - hw)/numCols:0;
		let fr = (iorj>hw)?2*(iorj - hw)/numCols:2*(hw -i)/numCols
		//let bfr = (i<hw)?2*(hw -i)/numCols:0;
		//let fr = which?ffr:bfr;
	
		//let fr = i/numCols;
		let stepFactor,maxFactor;
		
		stepFactor = 4;
		maxFactor = 25;
		maxFactor = 35;
		rnp.min = 0;
		let frp = fr;// * fr;
		rnp.max = frp * maxFactor;
 		rnp.step = frp *stepFactor;
		return rnp;
	}
	const walkParamsX = function (i,j) {
		return walkParams(i,j,0);
	}
	const walkParamsY = function (i,j) {
		return walkParams(i,j,1);
	}
	
		
		
this.setupShapeRandomizer('jogx', {numRows,numCols,walkParams:walkParamsX});
this.setupShapeRandomizer('jogy', {numRows,numCols,walkParams:walkParamsY});
	this.setupShapeRandomizer('red', {numRows,numCols,step:30,min:50,max:250});//walkParams:walkParamsRed});
	

	this.shapeGenerator = function (shapes,rvs,cell) {
		if ((cell.x == 50) && (cell.y = 50)) {
			debugger;
		}
		let {rectP,deltaX,deltaY} = this;
	//	let rb = Math.random() > 0.5;
		let shape  = svg.Element.mk('<g/>');

		//let inner = this.circleP.instantiate();
		let inner = this.rectP.instantiate();
		shape.set('i',inner);
	  inner.width = 1;
		inner.height = 1;
		
		shapes.push(shape);
		let jogx = rvs.jogx;
		let jogy = rvs.jogy;
		let r = Math.max(0,rvs.red);
		inner.moveto(Point.mk(jogx,jogy));
		inner.show();
		//shape.fill = `rgb(0,${Math.floor(r)},${Math.floor(g)})`;//${Math.floor(r)})`;
		//inner.fill = `rgb(0,${Math.floor(r)},${Math.floor(r)})`;
		inner.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		//shape.fill = `rgb(${Math.floor(g)},${Math.floor(g)},${Math.floor(g)})`;
		
		//shape.update();
		shape.show();
		return shape;
	}
		
		
		

 
this.initializeConstructor();
}
return rs;

});

