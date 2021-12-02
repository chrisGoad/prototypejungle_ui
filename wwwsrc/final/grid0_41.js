
core.require('/shape/circle.js','/shape/rectangle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',
function (circlePP,rectPP,rs,addGridMethods,addRandomMethods) {
  
//let rs = svg.Element.mk('<g/>');

addGridMethods(rs);
addRandomMethods(rs);
rs.saveImage = true;
rs.setName('grid0_41');
let ht = 400;
let topParams = {width:1.5*ht,height:ht,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht};
Object.assign(rs,topParams);
  rs.numDrops =3000;
  rs.numRows = 20;
  rs.numCols = 20;
	rs.spatter = 1;
	
rs.initProtos = function () {
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'rgba(0,0,0,1)';
  this.circleP.fill = 'rgba(0,0,200)';
  this.circleP['stroke-width'] = 0;
  this.circleP['stroke-width'] = 1;
  this.circleP.dimension = 4;
	core.assignPrototypes(this,'rectP',rectPP);
  this.rectP['stroke-width'] = 0;
}  


rs.shapeGenerator =  function (rvs,cell,pnt) {
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
 // core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('shade',{step:35,min:50,max:250});
	this.setupShapeRandomizer('dimension',{step:5,min:1,max:30});
  this.initializeGrid();
}	
return rs;
});
 