
core.require('/line/line.js','/grid/spatter4.js','/grid/dim2dWalker2.js',
function (linePP,addSpatterMethods,addRandomMethods) {
  
let item = svg.Element.mk('<g/>');

/*
item.rgb2color = function (r,g,b) {
    return `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
}*/
item.initializeProto = function () {
  core.assignPrototypes(this,'shapeP',linePP);
  this.shapeP.stroke = 'rgba(0,0,0,1)';
  this.shapeP.fill = 'rgba(0,0,200)';
  this.shapeP['stroke-width'] = 0;
  this.shapeP['stroke-width'] = 1;
  this.shapeP.dimension = 4;
}  
item.shapeGenerator = function (shapes,rvs) {

//item.setLenDir = function (shape,len,dir) {
  let shape = this.shapeP.instantiate();
  shapes.push(shape);
	let dir = rvs.direction;
  let len = rvs.length;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(len/2);
  let end0 = vec.minus();
  let end1 = vec;
  shape.setEnds(end0,end1);
	let r = rvs.red;
  let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  shape.stroke = rgb;
  shape.update();
  return shape;
}
  

item.initialize = function () {
  debugger;
  this.initializeProto();
  core.root.backgroundColor = 'black';
  this.width = 400;
  this.height = 400;
  this.numDrops =5000;
  addSpatterMethods(this);
  let rm = this.randomizer = {};
  addRandomMethods(rm);
  this.numRows = 40;
  this.numCols = 40;
	let rnds = this.randomGrids = {};

 // let  rParams = {step:0.1,min:0,max:1,numRows:this.rDivisions,numCols:this.rDivisions};
  let  rParams = {step:5,min:5,max:10,numRows:this.numRows,numCols:this.numCols};
  rnds.length = rm.genRandomGrid(rParams);
  let  dParams = {step:0.2* Math.PI,min:0,max:2*Math.PI,numRows:this.numRows,numCols:this.numCols};
  rnds.direction  = rm.genRandomGrid(dParams);
  let  cParams = {step:30,min:50,max:250,numRows:this.numRows,numCols:this.numCols};
  rnds.red = rm.genRandomGrid(cParams);
   
  this.spatter();
}	
return item;
});
 