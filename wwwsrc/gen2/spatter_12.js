
core.require('/shape/circle.js','/gen0/grid0.js',
function (linePP,addGridMethods) {
  
let rs = svg.Element.mk('<g/>');

addGridMethods(rs);
rs.saveImage = true;
rs.setName('spatter_12');
rs.width = 400;
  rs.height = 400;
  rs.numDrops =3000;
  rs.numRows = 20;
  rs.numCols = 20;
	rs.spatter = true;
	rs.loadFromPath = 0	;
	rs.saveJson = 0;
	rs.saveSpatterPoints = 1;
	
	
rs.initProtos = function () {
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP['stroke-width'] = 1;
	circleP.fill  = 'red';
}  


//rs.spatterGenerator =  function (rvs,cell,pnt) {
rs.shapeGenerator =  function (rvs,cell,pnt,idx) {
//item.setLenDir = function (shape,len,dir) {
	let {shapes,lineP,yg} = this;
	debugger;
  let shape = this.circleP.instantiate();
  shapes.push(shape);
	let dim = rvs.dimensiion;
	shape.dimension  = dim;
	shape.show();
	
  return shape;
}


rs.computeValuesToSave = function () {
	debugger;
  //let rndd = this.setupShapeRandomizer('direction', {step:0.2* Math.PI,min:0,max:2*Math.PI});
	let rndl = 	this.setupShapeRandomizer('length', {step:5,min:5,max:10});
  let rndd = this.setupShapeRandomizer('direction', {step:0.1* Math.PI,stept:0.1* Math.PI,min:0,max:2*Math.PI});
  let rnds = this.setupShapeRandomizer('shade', {step:30,min:50,max:250});
	this.genSpatterPoints();
	let spats = this.spatterPoints;
	this.yg = this.genYG();
	let vls = [[['randomGridsForShapes','direction'],rndd],[['randomGridsForShapes','shade'],rnds],[['randomGridsForShapes','length'],rndl],
	           [['spatterPoints'],spats],[['yg'],this.yg]];
	return vls;
}

rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('length', {step:5,min:5,max:10});
	//this.setupShapeRandomizer('direction', {step:0.2* Math.PI,min:0,max:2*Math.PI});
	//this.setupShapeRandomizer('shade', {step:30,min:50,max:250});
  //this.initializeGrid();
  this.outerInitialize();
}	
return rs;
});
 