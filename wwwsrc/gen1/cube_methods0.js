
core.require(
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function ()	{ 
  return function (rs) {





rs.randomCubePoint = function (cube) {
	let dim = cube.dimension;
	let x = dim*(Math.random() - 0.5);
	let y = dim*(Math.random() - 0.5);
	let z = dim*(Math.random() - 0.5);
	return Point3d.mk(x,y,z);
}

rs.randomUnitVec3d = function () {
	let x = (Math.random() - 0.5);
	let y = (Math.random() - 0.5);
	let z = (Math.random() - 0.5);
	let p = Point3d.mk(x,y,z);
	return p.normalize();
}

	

rs.randomSegment3d = function (cube) {
	let dim = cube.dimension;
	let p = this.randomCubePoint(cube);
	let v = this.randomUnitVec3d();
	let line = Line3d.mk(p,v);
	let seg = cube.intersect(line);
	if (seg) {
	  return seg;
	}
	debugger;  //keep
}

rs.randomSegments3d = function (cube,n) {
	let rs = [];
	for (let i=0;i<n;i++) {
		let seg = this.randomSegment3d(cube);
		rs.push(seg);
	}
	return rs;
}
	

	




}});

