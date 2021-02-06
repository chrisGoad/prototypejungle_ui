
core.require(
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function ()	{ 
  return function (rs) {

	
Object.assign(gp,newGlobalParams);
	
let newTopParams = {
	sphereCenter:Point3d.mk(0,0,-30),
	sphereDiameter:35,
	focalPoint:Point3d.mk(0,0,50),
	focalLength:10,
	cameraScaling:100
}
Object.assign(rs,newTopParams);


rs.genPoint3d = function (i,j) {
	
	let {numRows,numCols,sphereCenter,sphereDiameter,deltaX,deltaY} = this;
	let sp;
	let p = Point.mk(deltaX*(i-numCols/2),deltaY*(j-numRows/2));
	let p3d = p.to3d();
	let d = p3d.distance(sphereCenter);
  if (d < sphereDiameter) {
		let v = p3d.difference(sphereCenter).normalize();
	  sp = v.times(sphereDiameter).plus(sphereCenter);
		sp.category = 'onSphere';
		return sp;
	} else {
		return p.to3d();
	}
}




}});

