
core.require('/gen0/grid0.js','/shape/polygon.js','/gen1/cylinder_setup0.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (addGridMethods,polygonPP,setupCylinder)	{ 

let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
	

setupCylinder(rs);

let newTopParams  = {
	genPolygons:1,
	genCircles:0,
	numRows:20,
	numCols:20,
	polySize:0.8,
};

Object.assign(rs,newTopParams);


rs.initProtos = function () {
	core.assignPrototypes(this,'polygonP',polygonPP);
	this.polygonP.fill = 'yellow';
}  

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


rs.initialize = function () {
// let {focalPoint,focalLength,cameraScaling} = this;
 this.initProtos();
 debugger;
  this.initializeGrid();
}
return rs;


});

