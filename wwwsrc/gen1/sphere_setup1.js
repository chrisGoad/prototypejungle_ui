
core.require(
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function ()	{ 
  return function (rs) {

	
	
let newTopParams = {
	radius:10;
	focalPoint:Point3d.mk(0,0,50),
	focalLength:10,
	cameraScaling:100
}
Object.assign(rs,newTopParams);

rs.pointOnSphere = function (theta,phi) {
	let {radius:r} = this;
	//debugger;
	let sinTheta = Math.sin(theta);
	let xu = sinTheta * Math.cos(phi);
	let yu = sinTheta * Math.sin(phi);
	let zu =  Math.cos(theta);
	if (0 && (zu <= 0)) {
		return;
	}
	let p = Point3d.mk(r*xu,r*yu,r*zu);
  return p;
}



rs.genPoint3d = function (i,j) {
	
	let {numRows,numCols,sphereCenter,sphereDiameter,deltaX,deltaY} = this;
	let theta = (j/numCols) * Math.PI;//like latitude
	let phi = (i/numRows) * 2 * Math.PI; // like longitude
	let p = this.pointOnSphere(theta,phi);
	return p;
}

 rs.camera = geom.Camera.mk(rs.focalPoint,rs.focalLength,rs.cameraScaling,'z');



}});

