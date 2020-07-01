
core.require('/shape/rectangle.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (rectPP,constructor,addRandomMethods) {
  debugger;
  let rs0 = constructor();
  
rs0.initializeP = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP['stroke-width'] = 0;
	this.rectP.dimension = 4;
}  
let rs1 = constructor();
  
rs1.initializeP = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP['stroke-width'] = 0;
	this.rectP.dimension = 4;
}  


let initialize = function (rs,which) {
	debugger;
  rs.which = which;
	let backwards = which;
	rs.initializeP();
	if (0) {
		let endA0 = Point.mk(-50,-50);
		let endA1 = Point.mk(50,-50);
		let arcA = geom.Arc.mk(endA0,endA1,60);
		let endB0 = Point.mk(-30,50);
		let endB1 = Point.mk(60,50);
		rs.sideA = (fr) => arcA.pointOn(fr);
		//rs.sideA = (fr) => rs.linearInterpolator(endA0,endA1,fr);
		rs.sideB = (fr) => rs.linearInterpolator(endB0,endB1,fr);
		rs.positionFunction = rs.sidesPositionFunction;
	}
	let numRows = rs.numRows= 100;
	let numCols = rs.numCols = 100;
	rs.width = 300;
	rs.height = 300;
	rs.deltaX = rs.width/rs.numCols;
	rs.deltaY = rs.height/rs.numRows;
	rs.setupShapeRandomizer('red', {step:35,min:40,max:250,constantFirstRow:100,numRows,numCols,backwards});

	
	
	rs.shapeGenerator = function (shapes,rvs,cell) {
		debugger;
	  let {rectP,deltaX,deltaY,which,numCols} = this;
	  let cx = cell.x;
		let fr = which?0.5 + .5*cx/numCols:0.5*cx/numCols;
		let shape = rectP.instantiate();
		shapes.push(shape);
		let fc = 1.2;
		shape.width = fc*deltaX;
		shape.height = fc*deltaY;
		let r = rvs.red;
		//shape.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		//shape.fill = which?`rgb(${Math.floor(r)},${Math.floor(r)},0)`:`rgb(${Math.floor(r)},${Math.floor(r*fr)},0)`;
		shape.fill = `rgb(${Math.floor(r)},${Math.floor(r*fr)},${Math.floor(r*fr)})`;
		shape.update();
		shape.show();
		return shape;
	}
	rs.initializeConstructor();
}

	
	let  crs =svg.Element.mk('<g/>');
	
	crs.initialize = function () {
		this.set('c0',rs0);
		this.set('c1',rs1);
		initialize(rs0,0);
		initialize(rs1,1);
		let w = rs0.width - 2*(rs0.deltaX);
		
		rs0.moveto(Point.mk(-0.5*w,0));
		rs1.moveto(Point.mk(0.5*w,0));
	}
	

		
/*
rs.initialize = function () {
	debugger;
	    let rs = svg.Element.mk('<g/>');

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
	this.setupShapeRandomizer('red', {step:35,min:40,max:250,constantFirstRow:250,numRows,numCols,backwards:true});

	
	
	this.shapeGenerator = function (shapes,rvs) {
		debugger;
		let {rectP,deltaX,deltaY} = this;
		let shape = rectP.instantiate();
		shapes.push(shape);
		let fc = 1.1;
		shape.width = fc*deltaX;
		shape.height = fc*deltaY;
		let r = rvs.red;
		shape.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		shape.update();
		shape.show();
		return shape;
	}
		
		
*/		

 
//this.initializeConstructor();

return crs;

});

