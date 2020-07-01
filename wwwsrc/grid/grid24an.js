
core.require('/shape/rectangle.js','/grid/addGrid8.js',
//core.require('/shape/rectangle.js','/grid/addGrid8.js',
function (rectPP,addGridMethods) {
  debugger;
	let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
  
rs.initializeP = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP['stroke-width'] = 0;
	this.rectP.dimension = 4;
}  


rs.initialize = function () {
	debugger;
	core.root.backgroundColor = 'black';
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
		rnp.stepx = 10;
		rnp.stepy = 30;
		let bandwd = 0.02;
		if (fri === 0) {
			if (frj < 0.5) {
				rnp.max = 250;
				rnp.min = 200;
			} else {
				rnp.max = 1;
				rnp.min = 0;
			}
		} else if ((fri > (0.5-bandwd)) && (fri < (0.5 + bandwd))) {
			if (frj < 0.5) {
				rnp.max = 1;
				rnp.min = 0;
			} else {
				rnp.max = 200;
				rnp.min = 150;
			}
		} else {
			rnp.min =0;
			rnp.max = 250;
		}
		return rnp;
	}
			
	//this.setupShapeRandomizer('red', {step:35,min:40,max:250,constantFirstRoww:250,numRows,numCols,backwards:false});
	this.setupShapeRandomizer('red', {walkParams,numRows,numCols});

	
	
	this.shapeGenerator = function (rvs) {
		debugger;
		let {rectP,deltaX,deltaY,shapes} = this;
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
		
		
		

 
this.initializeGrid();
}
return rs;

});

