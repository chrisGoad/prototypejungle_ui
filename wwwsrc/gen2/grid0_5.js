
core.require('/shape/rectangle.js','/gen0/grid0.js',

//core.require(,'/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (rectPP,addGridMethods) {
  debugger;


let rs = svg.Element.mk('<g/>');	
addGridMethods(rs);
//rs.initProtos();
rs.saveImage = true;
rs.setName('grid0_5');
rs.loadFromPath = 0;
rs.numRows= 200;
rs.numCols = 200;
rs.width = 300;
rs.height = 300;

rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP['stroke-width'] = 0;
	this.rectP.dimension = 4;
}  

rs.shapeGenerator = function (rvs) {
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

rs.initialize = function () {
  let {numRows,numCols } = this;
	this.initProtos();
	//this.deltaX = this.width/this.numCols;
	//this.deltaY = this.height/this.numRows;
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
  this.initializeGrid();
}
return rs;
});

