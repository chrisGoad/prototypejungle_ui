
core.require('/shape/circle.js','/gen0/grid0.js',
function (circlePP,addGridMethods) {
  
	
let numTimeSteps = 30;
let rs = svg.Element.mk('<g/>');
rs.motionStep = 1;
addGridMethods(rs);
rs.saveImage = true;
rs.setName('wander0_1');
rs.width = 400;
  rs.height = 400;
  rs.numDrops =3000;
  rs.numRows = 40;
  rs.numCols = 80;
	
rs.initProtos = function () {
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'rgba(0,0,0,1)';
  this.circleP.fill = 'rgba(0,0,200)';
  this.circleP['stroke-width'] = 0;
  this.circleP['stroke-width'] = 1;
  this.circleP.dimension = 4;
}  


rs.shapeGenerator =  function (rvs,cell,pnt) {
	let {shapes,circleP} = this;
	if (this.timeStep > 0) {
		debugger;
	}
//item.setLenDir = function (shape,len,dir) {
	//let shape = this.nextShape(circleP);//rectP.instantiate();
	let shape = circleP.instantiate();;//rectP.instantiate();
	shapes.push(shape);
	/*let dim = rvs.dimension;
  shape.dimension = dim;
	let tr = shape.getTranslation();
	let dir = rvs.dir;
	let ms = this.motionStep;
	let vec = Point.mk(ms*Math.cos(dir),ms*Math.sin(dir));
	let np = tr.plus(vec);
//	shape.moveto(np);
	let {r,g,b} = rvs;
  let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  shape.stroke = rgb;
  shape.fill = 'transparent';
  shape.fill = rgb;
  //shape.fill = 'black';
	*/
	shape.show();
 // shape.update();
  return shape;
}

rs.shapeUpdater =  function (shape,rvs,cell,pnt) {
	let {shapes,circleP} = this;
	if (this.timeStep > 0) {
		debugger;
	}
//item.setLenDir = function (shape,len,dir) {
	//let shape = this.nextShape(circleP);//rectP.instantiate();
	let dim = rvs.dimension;
  shape.dimension = dim;
	let tr = shape.getTranslation();
	let dir = rvs.dir;
	let ms = this.motionStep;
	let vec = Point.mk(ms*Math.cos(dir),ms*Math.sin(dir));
	let np = tr.plus(vec);
//	shape.moveto(np);
	let {r,g,b} = rvs;
  let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  shape.stroke = rgb;
  shape.fill = 'transparent';
  shape.fill = rgb;
  //shape.fill = 'black';
  shape.update();
	shape.draw();
  return shape;
}


rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('r',{step:35,stept:5,min:150,max:250});
	this.setupShapeRandomizer('g',{step:35,stept:5,min:150,max:250});
	this.setupShapeRandomizer('b',{step:35,stept:5,min:150,max:250});
	this.setupShapeRandomizer('dimension',{step:1,stept:1,min:1,max:5});
	this.setupShapeRandomizer('dir',{step:12,stept:.1,min:0,max:2*Math.PI});
  this.initializeGrid();
	this.generatorsDoMoves = 1;
}	

rs.timeStep = 0;
rs.step = function ()   {
	debugger;
	this.stepShapeRandomizer('r');
	this.stepShapeRandomizer('g');
	this.stepShapeRandomizer('b');
	this.stepShapeRandomizer('dimension');
	this.stepShapeRandomizer('dir');
  this.updateGrid();
	draw.saveFrame(rs.timeStep);
	rs.timeStep++;
}
rs.animate = function ()  {
	this.animateIt(numTimeSteps,10);
	
}
return rs;
});
 