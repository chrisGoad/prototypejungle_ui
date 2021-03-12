
core.require('/shape/polyline.js','/gen0/grid0.js',
function (polylinePP,addGridMethods) {
  
let rs = svg.Element.mk('<g/>');

addGridMethods(rs);
rs.setName('grid0_46');
let topParams = {width:800,height:400,numRows:100,numCols:100,pointJiggle:0,factorX:0.25,factorY:0.05,crossColor:'yellow'};

Object.assign(rs,topParams);
	

rs.initProtos = function () {
  core.assignPrototypes(this,'polylineP',polylinePP);
  this.polylineP['stroke-width'] = 1;
  this.polylineP.stroke = 'yellow';
	this.finishProtos();
}  

rs.finishProtos = function () {
}


rs.colorGenerator = function (rvs,cell) {
	let r = Math.floor(Math.random()*255);
	let g = Math.floor(Math.random()*255);
	let b = Math.floor(Math.random()*255);
  let tone = Math.random();
	let rgb =`rgb(${r},${g},${b})`;
	return rgb;
}
rs.shapeGenerator = function (rvs,cell) {
	let {shapes,polylineP,deltaX,deltaY,factorX:fcx,factorY:fcy,numRows,numCols,crossColor} = this;
	let {p0x,p0y,p1x,p1y,p2x,p2y,p3x,p3y,interior} = rvs;
	let {x,y} = cell;
	let mr0 = Math.floor(0.333 * numRows);
	let mr1 = Math.floor(0.666 * numRows);
	let mc0 = Math.floor(0.333 * numCols);
	let mc1 = Math.floor(0.666 * numCols);
	//let fcx = 1/4;
	//let fcy = 1/20;
	let p0  = Point.mk(-deltaX*fcx,p0y*fcy);
	let p1  = Point.mk(-0.3333*deltaX*fcx,p1y*fcy);
	let p2  = Point.mk(0.3333*deltaX*fcx,p2y*fcy);
	let p3  = Point.mk(deltaX*fcx,p3y*fcy);
	debugger;
  let shape = polylineP.instantiate();
  shapes.push(shape);
	if (((mr0<y) && (y<mr1)) || ((mc0 < x) && (x < mc1))) {
		shape.stroke = crossColor;
	}
	shape.thePoints = [p0,p1,p2,p3];
	shape.update();
	//let clr = this.colorGenerator();
	//shape.fill = clr;
	//if (interior > 0.5) {
	//}
	shape.show()
  return shape;
}
	
rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
	let rmin = -100;
	let rmax = 100;
	let rstep = 45;
	this.setupShapeRandomizer('p0y',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('p1y',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('p2y',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('p3y',  {step:rstep,min:rmin,max:rmax});
	
  this.initializeGrid();
}	
return rs;
});
 