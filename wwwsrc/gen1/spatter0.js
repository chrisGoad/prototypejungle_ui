
core.require('/shape/circle.js','/gen0/grid0.js',
function (circlePP,addGridMethods) {
  
let rs = svg.Element.mk('<g/>');

addGridMethods(rs);
rs.saveImage = true;
rs.setName('spatter0');
rs.width = 1000;
  rs.height = 1000;
  rs.numDrops =3000;
  rs.numRows = 20;
  rs.numCols = 20;
	rs.spatter = true;
	rs.loadFromPath = 0	;
	rs.saveJson = 0;
	rs.saveSpatterPoints = 0;
	
	
rs.initProtos = function () {
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP['stroke-width'] = 1;
	this.circleP.fill  = 'red';
	this.circleP.dimension = 5;
}  


//rs.spatterGenerator =  function (rvs,cell,pnt) {
rs.shapeGenerator =  function (rvs,cell,pnt,idx) {
//item.setLenDir = function (shape,len,dir) {
	let {shapes,circleP} = this;
//	debugger;
  let shape = this.circleP.instantiate();
  shapes.push(shape);
	let dim = rvs.dimension;
	let r = rvs.r;
	let g = rvs.g;
	let b = rvs.b;
	let clr = `rgb(${r},${g},${b})`;
	shape.fill = clr;
	
	shape.dimension  = dim;
	shape.update();
	shape.show();
  return shape;
}



rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('dimension', {step:5,min:5,max:10});
	this.setupShapeRandomizer('r', {step:20,min:10,max:255});
	this.setupShapeRandomizer('g', {step:20,min:10,max:255});
	this.setupShapeRandomizer('b', {step:20,min:10,max:255});
	//this.setupShapeRandomizer('direction', {step:0.2* Math.PI,min:0,max:2*Math.PI});
	//this.setupShapeRandomizer('shade', {step:30,min:50,max:250});
  //this.initializeGrid();
  this.outerInitialize();
}	
return rs;
});
 