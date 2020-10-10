
core.require('/line/line.js','/gen0/grid0.js',
function (linePP,addGridMethods) {
  
let rs = svg.Element.mk('<g/>');

addGridMethods(rs);
rs.saveImage = true;
rs.setName('spatter_3');
rs.width = 400;
  rs.height = 400;
  rs.numDrops =3000;
  rs.numRows = 20;
  rs.numCols = 20;
	rs.spatter = true;
	rs.loadFromPath = 1;
	rs.saveJson = 0;
	
	
rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP['stroke-width'] = 1;
}  


//rs.spatterGenerator =  function (rvs,cell,pnt) {
rs.shapeGenerator =  function (rvs,cell,pnt) {
//item.setLenDir = function (shape,len,dir) {
	let {shapes,lineP} = this;
  let shape = this.lineP.instantiate();
  shapes.push(shape);
	let dir = rvs.direction;
  let len = rvs.length;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(len/2);
  let end0 = vec.minus();
  let end1 = vec;
  shape.setEnds(end0,end1);
	let r = rvs.shade;
  let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  shape.stroke = rgb;
  shape.update();
  return shape;
}

rs.computeValuesToSave = function () {
  let rnd = this.setupShapeRandomizer('direction', {step:0.2* Math.PI,min:0,max:2*Math.PI});
	let vls = [[['randomGridsForShapes','direction'],rnd]];
	return vls;
}

rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('length', {step:5,min:5,max:10});
	//this.setupShapeRandomizer('direction', {step:0.2* Math.PI,min:0,max:2*Math.PI});
	this.setupShapeRandomizer('shade', {step:30,min:50,max:250});
  //this.initializeGrid();
  this.outerInitialize();
}	
return rs;
});
 