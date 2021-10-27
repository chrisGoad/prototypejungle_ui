//active
core.require('/line/line.js','/shape/circle.js','/gen0/DropWebSphere.js',function (linePP,circlePP,rs) {

//let rs = svg.Element.mk('<g/>');
//addWebMethods(rs);
rs.setName('drop0_web0_2');
let ht= 2000;
ht = 6000;

//let topParams = {width:ht,height:ht,maxDrops:60000,maxTries:100,lineLength:2,backStripeColor:'rgb(2,2,2)',backStripePadding:0.2*ht,backStripeVisible:0,minSeparation:20,minConnectorLength:0,maxConnectorLength:300,shortenBy:20}
let topParams = {width:ht,height:ht,maxDrops:60000,maxTries:100,lineLength:2,backStripeColor:'rgb(2,2,2)',backStripePadding:0.2*ht,backStripeVisible:0,minSeparation:20,minConnectorLength:300,maxConnectorLength:600,shortenBy:20}
Object.assign(rs,topParams);
Object.assign(rs,rs.mkSphereParams());
rs.sphereCenter = Point3d.mk(0,0,-0.4*ht)

rs.initProtos = function () {
	debugger;
	let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = 5;
  let circleP = this.set('circleP',circlePP.instantiate()).hide();

}  
/*rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 5;
}  */


 
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

