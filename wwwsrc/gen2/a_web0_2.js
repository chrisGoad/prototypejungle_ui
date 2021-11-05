core.require('/line/line.js','/shape/circle.js','/gen0/Basics.js','/mlib/drop0.js','/mlib/web0.js','/mlib/sphere0.js',
function (linePP,circlePP,rs,addDropMethods,addWebMethods,addSphereMethods)  {
//core.require(function () {

addDropMethods(rs);
addWebMethods(rs);
addSphereMethods(rs);
//core.require('/gen1/web0.js',function (addWebMethods) {

//let rs = svg.Element.mk('<g/>');
//addWebMethods(rs);
rs.setName('a_web0_2');
let ht= 2000;
ht = 6000;

let topParams = {width:ht,height:ht,maxDrops:60000,maxTries:100,lineLength:2,backStripeColor:'rgb(2,2,2)',backStripePadding:0,backStripeVisible:0,minSeparation:20,minConnectorLength:0,maxConnectorLength:300,shortenBy:20}
Object.assign(rs,topParams);
Object.assign(rs,rs.mkSphereParams());
rs.sphereCenter = Point3d.mk(0,0,-0.4*ht)


rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 5;
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
	this.circleP.stroke = 'white';
	this.circleP['stroke-width'] = 0;
		let circleP2 = this.set('circleP2',circlePP.instantiate()).hide();
	
}  


 
rs.initialize = function () {
	let {focalPoint,focalLength,cameraScaling} = this;
	debugger;
  core.root.backgroundColor = 'black';
	this.addBackStripe();
	this.initProtos();
	let cc = this.set('cc',this.circleP.instantiate());
	cc.fill = 'rgb(45,5,5)';
	cc['stroke-width'] = 0;
	cc.dimension = ht;
	cc.show();
  this.zone = geom.Circle.mk(Point.mk(0,0),0.5*this.width);
	this.initializeDrop();
	let pnts = this.pointsFromCircleDrops();
	this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  let pnts3d = this.pointsTo3dAndBack(pnts);
	this.addWeb(pnts3d);
}


return rs;

});

