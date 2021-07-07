
core.require('/shape/circle.js','/line/line.js','/gen0/drop0.js','/mlib/web0.js',
function (circlePP,linePP,addDropMethods,addWebMethods)  {
//core.require(function () {
 return function (rs) {

addDropMethods(rs);
addWebMethods(rs);
rs.mkSphereParams = function () {
	let wd = this.width;
  return {sphereCenter:Point3d.mk(0,0,-0.3*wd),sphereDiameter:0.5*wd,focalPoint:Point3d.mk(0,0,wd),focalLength:10,cameraScaling:1000};
}
rs.initProtos = function () {
	debugger;
	let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 5;
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
  circleP.fill = 'transparent';
  circleP.stroke = 'red';
  this.circleP['stroke-width'] = 0;
	if (this.finishProtos) {
		this.finishProtos();
	}
}  

rs.genSegments = function (p) {
	rd = 30;
	let gcrc = geom.Circle.mk(p,rd);
	let scrc = this.circleP.instantiate();
	scrc.dimension = 2*rd;
	scrc.moveto(p);
	return [gcrc,scrc];
}
 
 
rs.toPoint3d = function (p) {
	let {sphereCenter,sphereDiameter} = this;
	let p3d = p.to3d();
	let d = p3d.distance(sphereCenter);
  if (d < sphereDiameter) {
		let v = p3d.difference(sphereCenter).normalize();
	  let sp = v.times(sphereDiameter).plus(sphereCenter);
		return sp;
	} 
	return undefined;
	
}



rs.pointsTo3dAndBack = function (pnts) {
	let rs = [];
	pnts.forEach((p) => {
		let p3d = this.toPoint3d(p);
		if (p3d) {
			let ppnt = this.camera.project(p3d);
			rs.push(ppnt);
		} 
	});
	return rs;
}

return rs;

 }});

