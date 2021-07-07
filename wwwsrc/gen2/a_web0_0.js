
core.require('/gen1/web0.js',function (addWebMethods) {

let rs = svg.Element.mk('<g/>');
addWebMethods(rs);
rs.setName('a_web0_0');
let ht= 2000;
ht = 8000;
let topParams = {onSphere:1,width:ht,height:ht,maxDrops:6000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,minConnectorLength:10,maxConnectorLength:1000,shortenBy:0,sphereCenter:Point3d.mk(0,0,-0.3*ht),sphereDiameter:0.5*ht,focalPoint:Point3d.mk(0,0,ht),focalLength:10,cameraScaling:1000}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 5;
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

