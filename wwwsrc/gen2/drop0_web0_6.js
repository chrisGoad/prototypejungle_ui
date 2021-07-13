
core.require('/gen1/web0.js',function (addWebMethods) {

let rs = svg.Element.mk('<g/>');
addWebMethods(rs);
rs.setName('drop0_web0_6');
let ht= 2000;
ht = 4000;
let nrc = 20;
let topParams = {onSphere:1,width:1.5*ht,height:ht,maxDrops:6000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,minConnectorLength:10,maxConnectorLength:100,shortenBy:0,sphereCenter:Point3d.mk(0,0,-0.3*ht),sphereDiameter:0.5*ht,focalPoint:Point3d.mk(0,0,ht),focalLength:10,cameraScaling:1000};
topParams = {numRows:nrc,numCols:nrc,width:1.5*ht,height:ht,maxDrops:10000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,minConnectorLength:0,maxConnectorLength:200,shortenBy:10,sphereCenter:Point3d.mk(0,0,-0.3*ht),sphereDiameter:0.5*ht,focalPoint:Point3d.mk(0,0,ht),focalLength:10,cameraScaling:1000}

rs.maxDrops = 2000;
Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 6;
}  

const nearDiagonal = function (pi,pj,howNear) {
	return true;
	let {x:pix,y:piy} = pi;
	let {x:pjx,y:pjy} = pj;
	let dx = Math.abs(pjx - pix);
	 dx = pjx - pix;
	let dy = Math.abs(pjy - piy);
  dy = piy - pjy;
	let a = (180 * Math.atan2(dx,dy))/Math.PI;
	return (a > (45-howNear)) && (a < (45+howNear));
}
	
rs.numCalls = 0;
rs.pairFilter = function (i,j) {
	//let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints,numDropped,width,randomGridsForShapes} = this;
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints,numDropped,width} = this;
	
  let pi = cPoints[i];
  let pj = cPoints[j];
  let cell = this.cellOf(pi);
	debugger;
	//let rvs =  this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
	let rvs = this.rvsAtCell(cell);
   let cln = rvs.connectorLn;
  //console.log('celli',celli);
	let d = pi.distance(pj);
	if ((cln < d) && (d < (cln + 100))) {
	//if ((mnCln < d) && (d < mxCln)) {
		return nearDiagonal(pi,pj,40);
	}
}


rs.initialize = function () {
		let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints,numDropped,width} = this;

  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('connectorLn',{step:80,stept:0.5,min:50,max:500});

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

