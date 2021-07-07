
core.require('/shape/rectangle.js','/shape/circle.js','/gen0/drop0.js','/gen0/web0.js',function (rectPP,circlePP,addDropMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
addWebMethods(rs);
rs.setName('drop0__29');
let ht= 2000;
ht = 8000;
topParams = {onSphere:1,width:ht,height:ht,maxDrops:6000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,minConnectorLength:10,maxConnectorLength:1000,shortenBy:0,sphereCenter:Point3d.mk(0,0,-0.3*ht),sphereDiameter:0.5*ht,focalPoint:Point3d.mk(0,0,ht),focalLength:10,cameraScaling:1000}
//topParams = {width:ht,height:ht,maxDrops:10000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:20,minSeparation:20,minConnectorLength:150,maxConnectorLength:300,shortenBy:0}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 5;
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
  circleP.fill = 'transparent';
  circleP.stroke = 'red';
  this.circleP['stroke-width'] = 0;

	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.stroke= 'white';
	this.rectP.fill = 'rgb(50,0,0)';
	this.rectP['stroke-width'] = 2;
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
		sp.category = 'onSphere';
		//console.log('hid a point');
		return sp;
	} else {		
		return undefined;
	}
}

rs.pointsTo3dAndBack = function (pnts) {
	let rs = [];
	pnts.forEach((p) => {
		let p3d = this.toPoint3d(p);
		if (!p3d) {
			debugger;
		}
		if (p3d) {
			let ppnt = this.camera.project(p3d);
			rs.push(ppnt);
		}
	});
	return rs;
}

rs.initialize = function () {
		let {focalPoint,focalLength,cameraScaling} = this;
  core.root.backgroundColor = 'black';
  this.zone = geom.Circle.mk(Point.mk(0,0),0.5*this.width);
	this.initializeDrop();
	let pnts = this.pointsFromCircleDrops();
	this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');

  let pnts3d = this.pointsTo3dAndBack(pnts);
	this.addWeb(pnts3d);
}

return rs;

});

