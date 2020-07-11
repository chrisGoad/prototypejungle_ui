
core.require('/shape/circle.js','/gen0/grid0.js',
function (circlePP,addGridMethods,addRandomMethods) {
  
let rs = svg.Element.mk('<g/>');

addGridMethods(rs);
rs.saveImage = true;
rs.setName('spatter_1');
rs.width = 400;
  rs.height = 400;
  rs.numDrops =3000;
  rs.numRows = 20;
  rs.numCols = 20;
	
rs.initProtos = function () {
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'rgba(0,0,0,1)';
  this.circleP.fill = 'rgba(0,0,200)';
  this.circleP['stroke-width'] = 0;
  this.circleP['stroke-width'] = 1;
  this.circleP.dimension = 4;
}  


rs.spatterGenerator =  function (rvs,cell,pnt) {
	let {shapes,circleP} = this;
//item.setLenDir = function (shape,len,dir) {
  let shape = this.circleP.instantiate();
  shapes.push(shape);
	let dim = rvs.dimension;
  shape.dimension = dim;
	let r = rvs.shade;
  let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  shape.fill = rgb;
  shape.update();
  return shape;
}

rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('shade',{step:35,min:50,max:250});
	this.setupShapeRandomizer('dimension',{step:5,min:1,max:30});
  this.initializeGrid();
}	
return rs;
});
 