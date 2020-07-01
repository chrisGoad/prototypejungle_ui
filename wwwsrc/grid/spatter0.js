
core.require('/shape/circle.js','/grid/spatter.js','/grid/dim2dWalker2.js',
function (circlePP,addSpatterMethods,addRandomMethods) {
  
let item = svg.Element.mk('<g/>');

item.initializeProto = function () {
  core.assignPrototypes(this,'shapeP',circlePP);
  this.shapeP.stroke = 'rgba(0,0,0,1)';
  this.shapeP.fill = 'rgba(0,0,200)';
  this.shapeP['stroke-width'] = 0;
  this.shapeP['stroke-width'] = 1;
  this.shapeP.dimension = 4;
}  

item.rgb2color = function (r,g,b) {
    return `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
}
item.shapeGenerator = function (shapes,len,dir0,dir1,color) {

//item.setLenDir = function (shape,len,dir) {
  let shape = this.shapeP.instantiate();
  shapes.push(shape);
  shape.dimension = len*2;
  shape.fill = color;
  shape.update();
  return shape;
}

item.initialize = function () {
  debugger;
  this.initializeProto();
  core.root.backgroundColor = 'black';
  this.width = 400;
  this.height = 400;
  this.numDrops =3000;
  addSpatterMethods(this);
  let rm = this.randomizer = {};
  addRandomMethods(rm);
  this.numRows = 20;
  this.numCols = 20;
 // let  rParams = {step:0.1,min:0,max:1,numRows:this.rDivisions,numCols:this.rDivisions};
  let  rParams = {step:5,min:1,max:30,numRows:this.numRows,numCols:this.numCols};
  this.sizes  = rm.genRandomGrid(rParams);
  let  cParams = {step:30,min:50,max:250,numRows:this.numRows,numCols:this.numCols};
  this.redR  = rm.genRandomGrid(cParams);
   
  this.spatter();
}	
return item;
});
 