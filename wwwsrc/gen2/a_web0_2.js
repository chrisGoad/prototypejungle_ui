
core.require('/gen1/web0.js',function (addWebMethods) {

let rs = svg.Element.mk('<g/>');
addWebMethods(rs);
rs.setName('a_web0_2');
let ht= 2000;
ht = 8000;

let topParams = {width:ht,height:ht,maxDrops:60000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:20,minSeparation:20,minConnectorLength:0,maxConnectorLength:300,shortenBy:20}
Object.assign(rs,topParams);
Object.assign(rs,rs.mkSphereParams());
rs.sphereCenter = Point3d.mk(0,0,-0.4*ht)

rs.finishProtos = function () {
	this.lineP.stroke = 'white';
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

