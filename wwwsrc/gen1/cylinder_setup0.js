
core.require(
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function ()	{ 
  return function (rs) {

	
// along y axis	
let newTopParams = {
	length:50,
	radius:20,
	focalPoint:Point3d.mk(0,0,50),
	focalLength:10,
	cameraScaling:10,
}
Object.assign(rs,newTopParams);


rs.genPoint3d = function (i,j) {
	// rows around, cols along length
	let {numRows,numCols,length,radius} = this;
	//let circumfrence = 2* Math.PI*radius;
	//debugger;
	let y = length - j*(length/numRows);
	let angle = ( (2*i/numCols) - 0.5)*Math.PI;
	let cos = Math.cos(angle);
	let p = Point3d.mk(Math.sin(angle)*radius,y,cos*radius);
	console.log('genPoint3d i j angle p ',i,j,angle,' p ',p.x,p.y);
	//debugger;
	
	if (cos < 0) {
		p.hideMe = 1;
	}
	
	return p;
}

 rs.camera = geom.Camera.mk(rs.focalPoint,rs.focalLength,rs.cameraScaling,'z');



}});

