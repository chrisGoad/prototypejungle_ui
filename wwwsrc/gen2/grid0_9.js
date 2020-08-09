
core.require('/shape/rectangle.js','/gen0/grid0.js',

//core.require(,'/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (rectPP,addGridMethods) {
  debugger;

  let numTimeSteps = 50;
let rs = svg.Element.mk('<g/>');	
addGridMethods(rs);
//rs.initProtos();
rs.saveImage = true;
rs.setName('grid0_9');
rs.loadFromPath = 0;
rs.numRows= 200;
rs.numRows= 20;
rs.numCols = 200;
//rs.numCols = 50;
rs.width = 300;
rs.height = 300;

rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP['stroke-width'] = 0;
	this.rectP.dimension = 4;
}  
let timeStep = 0;
rs.shapeGenerator = function (rvs) {
	let {rectP,deltaX,deltaY,shapes} = this;
	//let fr = (numTimeSteps-timeStep)/numTimeSteps;
	let frfr = 1;
	let fr = frfr*timeStep/(numTimeSteps/4);
	let shape = this.nextShape(rectP);//rectP.instantiate();
	//shapes.push(shape);
	let fh = 1.1;
  let fw = 0.5;
	shape.width = fw*deltaX;
	shape.height = fh*deltaY;
	let r = rvs.red;
	let g = rvs.green;
	let b = rvs.blue;
	let ir = Math.floor(r/50)*50;
	shape.fill = `rgb(${Math.floor(fr*r)},${Math.floor(fr*g)},${Math.floor(fr*b)})`;
	shape.update();
	shape.show();
	return shape;
}

rs.initialize = function () {
	core.root.backgroundColor = 'black';
  let {numRows,numCols } = this;
	this.initProtos();
	//this.deltaX = this.width/this.numCols;
	//this.deltaY = this.height/this.numRows;

	//this.setupShapeRandomizer('red', {step:35,min:40,max:250,constantFirstRoww:250,numRows,numCols,backwards:false});
	//this.setupShapeRandomizer('red', {walkParams,numRows,numCols});
	this.setupShapeRandomizer('red', {stepx:20,stepy:20,stept:20,min:0,max:200});
		this.setupShapeRandomizer('green', {stepx:20,stepy:20,stept:20,min:0,max:200});
		this.setupShapeRandomizer('blue', {stepx:20,stepy:20,stept:20,min:0,max:200});

  this.initializeGrid();
}


rs.step = function ()   {
	debugger;
	this.stepShapeRandomizer('red');
	this.stepShapeRandomizer('green');
	this.stepShapeRandomizer('blue');
  this.updateGrid();
	timeStep++;
}
rs.animate = function ()  {
	this.animateIt(numTimeSteps,10);
	
}


return rs;
});

