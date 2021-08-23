
core.require('/gen1/web0.js',function (addWebMethods) {

let rs = svg.Element.mk('<g/>');
addWebMethods(rs);
rs.setName('drop0_web0_3');
let ht= 2000;
ht = 8000;

let topParams = {width:ht,height:ht,maxDrops:10000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:20,minSeparation:20,minConnectorLength:2000,maxConnectorLength:2300,shortenBy:20,maxLoops:500000}
Object.assign(rs,topParams);

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
	this.addWeb(pnts);
}


return rs;

});

