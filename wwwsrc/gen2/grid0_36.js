
core.require('/gen1/grid0_8.js','/shape/polygon.js','/line/line.js','/gen1/torus_setup0.js','/gen1/layeredGrid1.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs,polygonPP,linePP,setupTorus,setupLayered)	{ 


setupTorus(rs);
setupLayered(rs);

let newGlobalParams = {
		genPolygons:1,
	genCircles:0,
}

let gp = rs.globalParams;
Object.assign(gp,newGlobalParams);

let newTopParams  = {
	Radius:50,
	radius:5,

	numRows:40,
	numCols:40,
	polySize:0.9,
	pointJiggle:0
};

Object.assign(rs,newTopParams);


rs.initProtos = function () {
	core.assignPrototypes(this,'polygonP',polygonPP);
	this.polygonP.fill = 'yellow';
	core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke  = 'white';
  this.blineP['stroke-width']  = 1;
}  
/*
rs.shapeGenerator = function (rvs,cell,center) {
	let {shapes,rectP,circleP,polygonP,polySize:sz} = this;
	debugger;
	if (this.hideThisCell(cell)) {
		return;
	}
	let shape = polygonP.instantiate();
	shapes.push(shape);
  shape.show();
	let corners = this.cellCorners(cell);
	let mcnt = center.minus();
	let rCorners = this.displaceArray(corners,mcnt);
	let sCorners = this.scaleArray(rCorners,sz,sz);
	shape.corners = sCorners;
	shape.update();
	return shape;
}
*/

let colors = ['green','red','cyan'];

rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {this
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

