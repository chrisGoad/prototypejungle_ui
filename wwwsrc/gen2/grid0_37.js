
core.require('/gen0/grid0.js','/shape/polygon.js','/line/line.js','/gen1/sphere_setup0.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (addGridMethods,polygonPP,linePP,setupTorus)	{ 

debugger;
let xx = Point3d.mk(1,0,0);
let yy = Point3d.mk(0,1,0);
let yy1 = Point3d.mk(1,1,0);
let zz = Point3d.mk(0,0,1);
let c1 = xx.crossP(yy);
let c2 = xx.crossP(yy1);
let c3 = xx.crossP(zz);

let rs = svg.Element.mk('<g/>');
addGridMethods(rs);

rs.setName('grid0_35');


setupTorus(rs);

let newTopParams  = {
	Radius:50,
	radius:5,
	genPolygons:1,
	genCircles:0,
	numRows:40,
	numCols:40,
	polySize:0.9,
	pointJiggle:0,
	generatorsDoMoves:1,
};

Object.assign(rs,newTopParams);


rs.initProtos = function () {
	core.assignPrototypes(this,'polygonP',polygonPP);
	this.polygonP.fill = 'yellow';
	core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke  = 'white';
  this.blineP['stroke-width']  = 1;
	core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke  = 'red';
  this.lineP['stroke-width']  = 1;
}  

rs.shapeGenerator = function (rvs,cell,center) {
	let {shapes,rectP,circleP,polygonP,polySize:sz,lineP,camera} = this;
	//debugger;
	if (this.hideThisCell(cell)) {
		return;
	} else {
	  debugger;
	}
	let shape = svg.Element.mk('<g/>');

	//let shape = polygonP.instantiate();
	shapes.push(shape);
  shape.show();
	let line0 = lineP.instantiate();
	let line1 = lineP.instantiate();
	shape.set('sg0',line0);
	shape.set('sg1',line1);
	line0.show();
	line1.show();
	let corners = this.cellCorners(cell);
	let [c0,c1,c2,c3] =  corners;
	let c0o = c0.origin;
	let c1o = c1.origin;
	let c2o = c2.origin;
	let c3o = c3.origin;
	let c0p = camera.project(c0o);
	
	line0.setEnds(c0p,c2);
	line1.setEnds(c1,c3);
	
/*	let mcnt = center.minus();
	let rCorners = this.displaceArray(corners,mcnt);
	let sCorners = this.scaleArray(rCorners,sz,sz);
	shape.corners = sCorners;*/
	line0.update();
	return shape;
}


let colors = ['green','red','cyan'];

rs.boundaryLineGenerator0 = function (end0,end1,rvs,cell) {
  let line = this.addShortenedLine(end0,end1,0.8);
  let {x,y} = cell;
	let ln = colors.length;
	let ym = y%ln;
	let color = colors[ym];
	line.stroke = color;
	if (y>4) {
		line.hide();
	}
//	let rcolor = `rgb(${150+Math.random()*100},${150+Math.random()*100},${150+Math.random()*100})`;
//	line.stroke = rcolor;
	/*let {blineP,lines} = this;
	let line = blineP.instantiate();
	lines.push(line);
  line.setEnds(end0,end1);
	line.show();*/
	return line;
}


rs.initialize = function () {
// let {focalPoint,focalLength,cameraScaling} = this;
 this.initProtos();
 debugger;
  this.initializeGrid();
}
return rs;


});

