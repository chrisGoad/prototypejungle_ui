
core.require('/gen1/web0.js',function (addWebMethods) {

let rs = svg.Element.mk('<g/>');
addWebMethods(rs);
rs.setName('drop0_web0_5');
let ht= 2000;
//ht = 8000;
let topParams = {onSphere:1,width:ht,height:ht,maxDrops:6000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,minConnectorLength:10,maxConnectorLength:100,shortenBy:0,sphereCenter:Point3d.mk(0,0,-0.3*ht),sphereDiameter:0.5*ht,focalPoint:Point3d.mk(0,0,ht),focalLength:10,cameraScaling:1000}
topParams = {onSphere:1,width:1.5*ht,height:ht,maxDrops:1000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,minConnectorLength:10,maxConnectorLength:500,shortenBy:10,sphereCenter:Point3d.mk(0,0,-0.3*ht),sphereDiameter:0.5*ht,focalPoint:Point3d.mk(0,0,ht),focalLength:10,cameraScaling:1000}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 2;
}  

rs.numCalls = 0;
rs.pairFilter = function (i,j) {
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints,numDropped,width} = this;
  let pi = cPoints[i];
  let pj = cPoints[j];
	let d = pi.distance(pj);
	let fr = (pi.x + 0.5*width) / width;
	//console.log('x',pi.x,'fr',fr);
	let pip = (pi.x > 0) && (pj.x > 0);
	let pin = (pi.x < 0) && (pj.x < 0);
	/*if (pip) {
		console.log('pos');
	} else 
	if (pin) {
		console,log('neg');
	}*/
	this.numCalls++;
  if ((this.numCalls % 10000)===0) {
		debugger;
	}
	let th = fr*300;
//	return 1;
	return (d > th) && (d< (th+200));
	if (pip) {
		return (300 < d) && (d < 1000);
	}
	if (pin) {
		return d <300;
	}
}
//	return (numDropped%50 !== 0)? d > 500:d <200;


rs.initialize = function () {
		let {focalPoint,focalLength,cameraScaling} = this;
  core.root.backgroundColor = 'black';
 // this.zone = geom.Circle.mk(Point.mk(0,0),0.5*this.width);
	this.initializeDrop();
	debugger;
	let pnts = this.pointsFromCircleDrops();
	//this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');

  //let pnts3d = this.pointsTo3dAndBack(pnts);
	this.addWeb(pnts);
	console.log('numCalls', this.numCalls);
}

return rs;

});

