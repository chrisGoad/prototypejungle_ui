
core.require('/gen0/min0.js','/shape/circle.js','/line/line.js','/mlib/pgen0.js','/mlib/webTree.js','/mlib/web0.js',function (addBasis,circlePP,linePP,addPointGenMethods,addWebTreeMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPointGenMethods(rs);
addWebMethods(rs);
addWebTreeMethods(rs);
rs.setName('min0_3');
let ht= 4000;
ht = 4000;
let nrc = 40;

let topParams = {maxFringeTries:10,numRows:nrc,numCols:nrc,width:1.5*ht,height:ht,maxDrops:20000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,minConnectorLength:200,maxConnectorLength:600,shortenBy:10,numPairs:2}

rs.maxDrops = 4000;
Object.assign(rs,topParams);


rs.initProtos = function () {
	let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 6;
}  

rs.choosePairs = rs.choosePairsAtRandom;


rs.genLine = function (sg,iext=0) {
	
	let {cPoints} = this;
	
  let {index0,index1,end0,end1} = sg;
	let p0 = cPoints[index0];
	let p1 = cPoints[index1];
	let line = this.lineP.instantiate();
	let  ext;
  if (p0.onFringe || p1.onFringe) {
	//	return;
		line.stroke = 'rgb(0,200,200)';
		ext = -30;
	} else {
		ext = 0;
	}
  if (ext) {
    let vec = end1.difference(end0);
    let nvec = vec.normalize();
    end1 = end1.plus(nvec.times(ext));
  }
  line.setEnds(end0,end1);

  return line;
}

rs.initialize = function () {
		let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,width} = this;

  core.root.backgroundColor = 'black';
		this.initBasis();

	this.setupShapeRandomizer('connectorLn',{step:80,stept:0.5,min:50,max:500});

 // this.zone = geom.Circle.mk(Point.mk(0,0),0.5*this.width);
	//this.initializeDrop();
	debugger;
	//let pnts = this.pointsFromCircleDrops();
	let pnts = this.genGrid(this);
	let p = pnts[0];
	p.onFringe = 1;
	//this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  this.initWeb(pnts);
	this.addWeb();
	this.addSegs();
	this.loopFringeAddition(0);
  //let pnts3d = this.pointsTo3dAndBack(pnts);
	//this.addWeb(pnts);
}

return rs;

});

