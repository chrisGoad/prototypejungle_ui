
core.require('/gen0/min0.js','/shape/circle.js','/line/line.js','/mlib/pgen0.js','/mlib/web0.js',function (addBasis,circlePP,linePP,addPointGenMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPointGenMethods(rs);
addWebMethods(rs);
//addWebMethods(rs);
rs.setName('min0_1');
let ht= 2000;
ht = 3000;
let nrc=64;
let mcl = 1.6*(ht/nrc);
//nrc = 2;
let  topParams = {width:ht,height:ht,numRings:nrc,numRows:nrc,numCols:nrc,minConnectorLength:mcl,maxConnectorLength:mcl*2};

Object.assign(rs,topParams);

rs.pairFilter = function (i,j) {
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints,numDropped,width} = this;
  let pi = cPoints[i];
  let pj = cPoints[j];
	let d = pi.distance(pj);
	if ((d<mnCln) || (d>mxCln)) {
		return false;
	}
	if ((pi.x === pj.x) || (pi.y === pj.y)) {
		return false;
	}
	return true;
}

rs.direction = function (p) {
	rs = Math.atan2(p.y,p.x);
  return rs;
}

rs.choosePairs = function (i) {
	let {cPoints,nearbyPoints} = this;
	let nears = this.nearbyPoints[i];
	let pi = cPoints[i];
	let minDev = Infinity;
	let idir = pi.direction;
	let rs;
	if (pi.direction) {
		nears.forEach((j) => {
			let pj = cPoints[j];
			let jdir = this.direction(pj.difference(pi));
			let dev = Math.abs(jdir-idir);
			if (dev < minDev) {
				minDev = dev;
				rs = j;
			}
		});
		return [rs];
	}
	let nl = nears.length;
	return [Math.floor (nl* Math.random())];
}
	
			

rs.beforeAddSeg = function (i,j) {
  let {cPoints}  = this;
	debugger;
	let pi = cPoints[i];
	let pj = cPoints[j];
	pj.predecessor = i;
	pj.direction = this.direction(pj.difference(pi));
	pi.interior = 1;
	pi.onFringe = 0;
	pj.onFringe= 1;
}


rs.singletonFilter  = function (i) {
	let pi = this.cPoints[i];
	return pi.onFringe;
	
	return !(i%50);
}



rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	lineP['stroke-width'] = 5;
	lineP.stroke  = 'white';
  let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP.dimension = 20;
	circleP.fill = 'transparent';
	
}  

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	debugger;
	let pnts = this.genGrid(this);
	let p = pnts[0];
	p.onFringe = 1
	this.placeShapesAtPoints(pnts,this.circleP);
	this.addWeb(pnts);
}


return rs;

});

