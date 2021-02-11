
core.require(
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function ()	{ 
  return function (rs) {

	
// in x,y plane
let newTopParams = {
	Radius:50,
	radius:20,
  focalPoint:Point3d.mk(0,0,50),
//	focalPoint:Point3d.mk(0,0,500),
	focalLength:10,
	cameraScaling:10,
}
Object.assign(rs,newTopParams);


rs.genPoint3d = function (i,j) {
	// cols run horizontally, rows vertically
	let {numRows,numCols,Radius,radius} = this;
	//let circumfrence = 2* Math.PI*radius;
	//debugger;
	let y = length - j*(length/numRows);
	let Angle = ( (2*i/numCols) - 0.5)*Math.PI;
	let angle = ( (2*j/numRows) - 0.5)*Math.PI;
	let tubeC = Point3d.mk(Math.cos(Angle)*Radius,Math.sin(Angle)*Radius,0);
	let lenTvecXY = radius * Math.cos(angle); // length of the vector from center of tube to result in XY plane
	let TvecX = Math.cos(Angle) * lenTvecXY;
	let TvecY = Math.sin(Angle) * lenTvecXY;
	let sina = Math.sin(angle);
	let TvecZ = radius * sina;
	let Tvec = Point3d.mk(TvecX,TvecY,TvecZ);
	let rs = tubeC.plus(Tvec);
	console.log('genPoint3d i j rs ',i,j,rs.x,rs.y,rs.z);
	if (sina < 0) {
		rs.hideMe = 1;
	}
	//debugger;
	return rs;
}
	
	
 rs.camera = geom.Camera.mk(rs.focalPoint,rs.focalLength,rs.cameraScaling,'z');



}});

